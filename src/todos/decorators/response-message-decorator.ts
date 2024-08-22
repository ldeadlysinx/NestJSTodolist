import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// @ResponseMsg("asdf")
export const ResponseMsg = (message: string) =>
  SetMetadata('response-message', message);
