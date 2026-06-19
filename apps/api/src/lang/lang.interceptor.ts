import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Lang } from '@prisma/client';
import { map, Observable } from 'rxjs';

@Injectable()
export class LangInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map((lang: Lang) => ({ id: lang.id })));
    }
}
