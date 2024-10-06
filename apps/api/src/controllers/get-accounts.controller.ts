import { ConflictException, Get, HttpCode, UseGuards } from '@nestjs/common';
import { Body, Controller } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUserId } from 'src/auth/current-user-id.decorator';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class GetAccountsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @HttpCode(200)
  async createAccount(@CurrentUserId() userId: string) {
    const accounts = await this.prisma.account.findMany({
      where: {
        people: {
          some: {
            userId,
          },
        },
      },
    });

    return accounts;
  }
}
