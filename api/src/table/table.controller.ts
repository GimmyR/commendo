import { AccountGuard } from '@/account/account.guard';
import { langDoc } from '@/dish/dish.doc';
import { tableIdDoc } from '@/table/table.doc';
import { EditTable } from '@/table/table.dto';
import { TableService } from '@/table/table.service';
import { Body, Controller, Get, HttpStatus, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('table')
@ApiTags('table')
@ApiBearerAuth("access-token")
export class TableController {
    constructor(private readonly tableServ: TableService) {}

    @Get()
    @UseGuards(AccountGuard)
    @ApiOperation({ summary: "Find all tables" })
    @ApiResponse({ status: HttpStatus.OK, description: "All tables have been successfully returned" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Access token is missing or invalid" })
    async findAll() {
        return await this.tableServ.findAll();
    }

    @Get(":id")
    @UseGuards(AccountGuard)
    @ApiOperation({ summary: "Find unique table by id with current orders" })
    @ApiParam(tableIdDoc)
    @ApiQuery(langDoc)
    @ApiResponse({ status: HttpStatus.OK, description: "Unique table has been successfully returned" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Table not found" })
    async findUniqueByIdWithOrders(@Param("id") id: number, @Query("lang") lang: string) {
        return await this.tableServ.findUniqueByIdWithOrders(lang, id);
    }

    @Patch(":id")
    @UseGuards(AccountGuard)
    @ApiOperation({ summary: "Partially edit table" })
    @ApiParam(tableIdDoc)
    @ApiResponse({ status: HttpStatus.OK, description: "Table has been successfully edited" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Table not found" })
    async partiallyEditTable(@Param("id") id: number, @Body() table: EditTable) {
        return await this.tableServ.update(id, table);
    }
}
