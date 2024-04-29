import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "src/common/entities/user.entity";
import { Parent } from "src/parent/entities/parent.entity";

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): Promise<User> => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    },
  );