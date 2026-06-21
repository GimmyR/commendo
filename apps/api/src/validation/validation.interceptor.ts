import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Type } from '@nestjs/common';
import { RequestDto } from '@repo/shared';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { plainToInstance } from "class-transformer";

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
    constructor(private readonly DtoConstructor: Type<RequestDto>) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request: Request = context.switchToHttp().getRequest();
        const body = request.body;

        if(body) {
            const dto = plainToInstance(this.DtoConstructor, body);
            const errors = dto.validate();

            if(errors.length > 0)
                throw new BadRequestException(errors);
        }

        return next.handle();
    }
}
