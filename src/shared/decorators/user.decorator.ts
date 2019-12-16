import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data: string, req) => {
  const { user } = req;
  return data ? user && user[data] : user;
});
