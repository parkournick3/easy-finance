import { UnauthorizedException, UsePipes } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import {
  SignInInput,
  SignInResponse,
  signInSchema,
} from '@repo/validations-and-types';

@Controller('sessions')
export class AuthenticateController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(signInSchema))
  async signIn(@Body() body: SignInInput): Promise<SignInResponse> {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwt.sign({ sub: user.id });

    return {
      accessToken,
    };
  }
}
