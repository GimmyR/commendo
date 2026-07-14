import { AccountGuard } from '@/account/account.guard';
import { TableService } from '@/table/table.service';
import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('table')
@ApiTags('table')
export class TableController {
    constructor(private readonly tableServ: TableService) {}

    @Get()
    @UseGuards(AccountGuard)
    @ApiBearerAuth("access-token")
    @ApiOperation({ summary: "Find all tables" })
    @ApiResponse({ status: HttpStatus.OK, description: "All tables has been successfully returned" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Access token is missing or invalid" })
    async findAll() {
        return await this.tableServ.findAll();
    }
}
