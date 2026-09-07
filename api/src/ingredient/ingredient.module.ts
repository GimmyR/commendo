import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { AccountService } from '@/account/account.service';

@Module({
  providers: [IngredientService, AccountService],
  controllers: [IngredientController]
})
export class IngredientModule {}
