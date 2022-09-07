import { Migration } from '@mikro-orm/migrations';

export class Migration20220906181339 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'create table `users` (`userId` int unsigned not null auto_increment primary key, `email` varchar(320) not null, `password` varchar(255) not null, `createdAt` timestamp not null default current_timestamp, `updatedAt` timestamp not null default current_timestamp on update current_timestamp) default character set utf8mb4 engine = InnoDB;',
    );
    this.addSql('alter table `users` add unique `users_email_unique`(`email`);');

    this.addSql(
      "create table `transactions` (`transactionId` int unsigned not null auto_increment primary key, `source` enum('income', 'other', 'custom-source') not null default 'custom-source', `sum` decimal(10,2) not null, `description` varchar(1000) null, `date` datetime not null, `userId` int unsigned not null) default character set utf8mb4 engine = InnoDB;",
    );
    this.addSql('alter table `transactions` add index `transactions_userId_index`(`userId`);');

    this.addSql(
      'alter table `transactions` add constraint `transactions_userId_foreign` foreign key (`userId`) references `users` (`userId`) on update cascade;',
    );
  }

  public async down(): Promise<void> {
    this.addSql('alter table `transactions` drop foreign key `transactions_userId_foreign`;');

    this.addSql('drop table if exists `users`;');

    this.addSql('drop table if exists `transactions`;');
  }
}
