import { InventoryService } from '@/inventory/inventory.service';
import { Controller } from '@nestjs/common';

@Controller('inventory')
export class InventoryController {
    constructor(
        private readonly inventoryServ: InventoryService
    ) {}
}
