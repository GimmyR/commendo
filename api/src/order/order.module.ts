import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { AccountService } from '@/account/account.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, AccountService]
})
export class OrderModule {}
