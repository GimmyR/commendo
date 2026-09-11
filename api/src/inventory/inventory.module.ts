import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { AccountService } from '@/account/account.service';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService, AccountService]
})
export class InventoryModule {}
