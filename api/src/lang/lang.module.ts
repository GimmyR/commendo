import { Module } from '@nestjs/common';
import { LangController } from './lang.controller';
import { LangService } from './lang.service';
import { AccountService } from 'src/account/account.service';

@Module({
  controllers: [LangController],
  providers: [LangService, AccountService]
})
export class LangModule {}
