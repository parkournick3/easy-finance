import { ConflictException, HttpCode, UsePipes } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import {
  CreateUserInput,
  CreateUserResponse,
  createUserSchema,
} from '@repo/validations-and-types';

@Controller('users')
export class CreateUserController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(@Body() body: CreateUserInput): Promise<CreateUserResponse> {
    const { email, password, firstName, lastName, currency } = body;

    const userExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        person: {
          create: {
            firstName,
            lastName,
            accounts: {
              create: {
                currency,
                balance: 0,
              },
            },
          },
        },
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
