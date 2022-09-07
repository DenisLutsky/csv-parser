import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import moment from 'moment';

import { UserTransactionEntity } from '../entities';
import { ReportFilter, Transaction } from '../interfaces';
import { TimeFormats } from 'src/shared/enums';
import { UserService } from 'src/modules/user/services';
import { Report } from '../types';

@Injectable()
export class ReportService {
  public constructor(
    @InjectRepository(UserTransactionEntity)
    private readonly transactionsRepository: EntityRepository<UserTransactionEntity>,
    private readonly userService: UserService,
  ) {}

  public async uploadData(file: Express.Multer.File, userId: number): Promise<UserTransactionEntity[]> {
    const csvStringified = file.buffer.toString();

    const lines = csvStringified.split('\r\n');
    const header = lines[0];
    const records = lines.slice(1);

    const receivedColumns = header.split(',');
    const expectedColumns = ['date', 'sum', 'source', 'description'];

    if (!receivedColumns.every((value, index) => value === expectedColumns[index])) {
      throw new BadRequestException({
        message: 'The columns in provided file do not equal to expected',
        received: receivedColumns,
        expected: expectedColumns,
      });
    }

    const transactions = this.prepareRecords(records);
    const user = await this.userService.findOneById(userId);

    const userTransactions: UserTransactionEntity[] = [];

    for (const transaction of transactions) {
      userTransactions.push(this.transactionsRepository.create({ ...transaction, user }));
    }

    await this.transactionsRepository.persistAndFlush(userTransactions);

    return userTransactions;
  }

  public async getReport(filter: ReportFilter, userId: number): Promise<Report> {
    const { date, source } = filter;

    const month = moment(date, TimeFormats.MONTH_FORMAT);

    const records = await this.transactionsRepository.find({
      date: {
        $gte: month.toDate(),
        $lt: month.add(1, 'month').toDate(),
      },
      source: { $in: source },
      user: {
        userId,
      },
    });

    const response = source.map((s) => {
      const sums = records.filter((r) => r.source === s).map((r) => Number(r.sum));

      const total = sums.reduce((total, x) => total + x, 0);

      return { source: s, data: [{ date: month.format(TimeFormats.MONTH_FORMAT), total }] };
    });

    return response;
  }

  private prepareRecords(records: string[]): Transaction[] {
    return records.map((e, index) => {
      const data = e.split(',');
      const sum = Number(data[1]);
      const date = moment(data[0], TimeFormats.DATE_FORMAT).toDate();

      if (typeof sum !== 'number' || !sum) {
        throw new BadRequestException({
          message: `Value in field "sum" of record #${index + 1} is invalid`,
          value: data[1],
        });
      }

      return { date, sum, source: data[2], description: data[3] };
    });
  }
}
