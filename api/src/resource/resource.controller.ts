import { Controller, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { ResourceService } from 'src/resource/resource.service';

@Controller('resource')
@ApiTags('resource')
export class ResourceController {
    constructor(private readonly resourceServ: ResourceService) {}

    @Get(':filename')
    @ApiOperation({ summary: 'Get resource by file name' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Resource has been successfully returned' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Resource not found' })
    async getByFilename(@Param('filename') filename: string, @Res() res: Response) {
        this.resourceServ.findByFilename(res, filename);
    }

    @Post()
    @ApiOperation({ summary: 'Create resource with application/octet-stream in request' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Resource has been successfully created' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Resource is invalid' })
    async uploadImage(@Req() req: Request) {
        const resourcePath = await this.resourceServ.create(req, ['jpeg', 'jpg', 'png']);
        return { pathname: resourcePath };
    }
}
