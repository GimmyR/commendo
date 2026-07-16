import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { AccountService } from '@/account/account.service';

@Module({
  controllers: [TableController],
  providers: [TableService, AccountService]
})
export class TableModule {}
