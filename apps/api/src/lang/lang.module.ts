import { Module } from '@nestjs/common';
import { LangController } from './lang.controller';
import { LangService } from './lang.service';
import { AccountService } from 'src/account/account.service';
import { RoleService } from 'src/role/role.service';

@Module({
  controllers: [LangController],
  providers: [LangService, AccountService, RoleService]
})
export class LangModule {}
