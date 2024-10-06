import { Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUserId } from 'src/auth/current-user-id.decorator';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class GetTransactionsByAccountController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(':accountId')
  @HttpCode(200)
  async getTransactionsByAccount(
    @CurrentUserId() userId: string,
    @Param('accountId') accountId: string,
  ) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        account: {
          id: accountId,
          people: {
            some: {
              userId,
            },
          },
        },
      },
    });

    return transactions;
  }
}
