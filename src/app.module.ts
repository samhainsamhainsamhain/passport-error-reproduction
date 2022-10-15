import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';

import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

import { User } from './typeorm/entities/User';
import { Session } from './typeorm/entities/Session';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'testserver',
      entities: [User, Session],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
