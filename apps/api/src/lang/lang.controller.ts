import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LangService } from 'src/lang/lang.service';

@Controller('lang')
@ApiTags("lang")
export class LangController {
    constructor(
        private readonly langServ: LangService
    ) {}

    @Get()
    @ApiOperation({ summary: "Get all languages" })
    @ApiResponse({ status: HttpStatus.OK, description: "All languages are returned" })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Unknown error" })
    async getAll() {
        return await this.langServ.getAll();
    }
}
