import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateUserController } from './controllers/create-user.controller';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateTransactionController } from './controllers/create-transaction.controller';
import { GetAccountsController } from './controllers/get-accounts.controller';
import { GetTransactionsByAccountController } from './controllers/get-transactions-by-account.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    AuthModule,
  ],
  controllers: [
    CreateUserController,
    AuthenticateController,
    CreateTransactionController,
    GetAccountsController,
    GetTransactionsByAccountController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
