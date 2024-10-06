import {
  ConflictException,
  HttpCode,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUserId } from 'src/auth/current-user-id.decorator';

const createTransactionSchema = z.object({
  accountId: z.string(),
  amount: z.number(),
  description: z.string(),
  date: z.string().transform((value) => new Date(value)),
});

type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

const validationPipe = new ZodValidationPipe(createTransactionSchema);

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class CreateTransactionController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async createAccount(
    @Body(validationPipe) body: CreateTransactionInput,
    @CurrentUserId() userId: string,
  ) {
    const { accountId, amount, description, date } = body;

    const account = await this.prisma.account.findUnique({
      where: {
        id: accountId,
        people: {
          some: {
            userId,
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (!account) {
      throw new ConflictException('Account not found');
    }

    const person = await this.prisma.person.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!person) {
      throw new ConflictException('Person not found');
    }

    const transaction = await this.prisma.transaction.create({
      data: {
        accountId,
        personId: person.id,
        amount,
        description,
        date,
      },
    });

    return transaction;
  }
}
