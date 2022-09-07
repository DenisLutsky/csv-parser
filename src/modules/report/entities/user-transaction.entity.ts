import { Entity, IdentifiedReference, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';

import { UserEntity } from 'src/modules/user/entities';
import { Nullable } from 'src/shared/types';

@Entity({ tableName: 'transactions' })
export class UserTransactionEntity {
  @PrimaryKey()
  public transactionId!: number;

  @Property({ type: String })
  public source!: string;

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
