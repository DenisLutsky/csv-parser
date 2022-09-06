import { Entity, Enum, IdentifiedReference, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';

import { UserEntity } from 'src/modules/user/entities';
import { TransactionSources } from 'src/shared/enums';
import { Nullable } from 'src/shared/types';

@Entity({ tableName: 'transactions' })
export class UserTransactionEntity {
  @PrimaryKey()
  public transactionId!: number;

  @Enum({ items: () => TransactionSources, default: TransactionSources.CUSTOM_SOURCE })
  public source!: TransactionSources;

  @Property({ columnType: 'decimal(10,2)', unsigned: true })
  public sum!: number;

  @Property({ type: String, length: 1000, nullable: true })
  public description!: Nullable<string>;

  @Property({ columnType: 'datetime' })
  public date!: Date;

  @ManyToOne(() => UserEntity, { joinColumn: 'userId', wrappedReference: true })
  public user!: IdentifiedReference<UserEntity, 'userId'>;

  public [OptionalProps]?: 'transactionId';
}
