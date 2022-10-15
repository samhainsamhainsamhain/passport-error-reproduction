import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';

import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

import MysqlDataSource from './typeorm/MySQLDataSource';
import entities from './typeorm/Entities';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      ...MysqlDataSource.options,
      entities,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
