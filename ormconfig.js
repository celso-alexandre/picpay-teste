/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const ormconfig = {
   synchronize: true,
   logging: false,
   type: 'postgres',
   host: 'localhost',
   port: '5432',
   username: 'postgres',
   password: 'docker1234',
   database: 'postgres',
   entities: [
      path.resolve('./src/typeorm/entity/**/*.ts'),
   ],
   migrations: [
      path.resolve('./src/typeorm/migration/**/*-picpayapi_*.ts'),
   ],
   subscribers: [
      path.resolve('./src/typeorm/subscriber/**/*.ts'),
   ],
   cli: {
      entitiesDir: path.resolve('./src/typeorm/entity'),
      migrationsDir: path.resolve('./src/typeorm/migration'),
      subscribersDir: path.resolve('./src/typeorm/subscriber'),
   },
};

module.exports = ormconfig;
