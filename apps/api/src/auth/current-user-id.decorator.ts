import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from './jwt.strategy';

export const CurrentUserId = createParamDecorator(
  (_: never, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();

    const { sub: userId } = request.user as TokenPayload;

    return userId;
  },
);
