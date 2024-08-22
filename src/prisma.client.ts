import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    //모듈 연결시 프리스마 연결
    async onModuleInit() {
    await this.$connect();
  }
}
