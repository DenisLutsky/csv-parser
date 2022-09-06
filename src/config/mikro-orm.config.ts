import { Options, EntityCaseNamingStrategy } from '@mikro-orm/core';
import { config } from './app.config';

const { user, password, port, name, host, debug } = config.mysql;

const ormConfig: Options = {
  migrations: {
    tableName: 'migrations',
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    transactional: true,
    emit: 'ts',
  },
  entities: ['dist/**/*.entity.js'],
  dbName: name,
  password,
  user,
  host,
  port,
  debug,
  type: 'mysql',
  namingStrategy: EntityCaseNamingStrategy,
  allowGlobalContext: true,
  forceUtcTimezone: true,
};

export default ormConfig;
