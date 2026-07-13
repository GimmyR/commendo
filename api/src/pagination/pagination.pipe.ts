import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

export interface Pagination {
    page: number | undefined;
    take: number | undefined;
    skip: number;
}

@Injectable()
export class PaginationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): Pagination {
        const page = value.page ? parseInt(value.page) : undefined;
        const limit = value.limit ? parseInt(value.limit) : undefined;

        if(page && (isNaN(page) || page <= 0)) throw new BadRequestException("Page parameter should be a positive integer");
        if(limit && (isNaN(limit) || limit <= 0)) throw new BadRequestException("Limit parameter should be a positive integer");

        const skip = page && limit ? (page - 1) * limit : 0;
        return {page, take: limit, skip};
    }
}