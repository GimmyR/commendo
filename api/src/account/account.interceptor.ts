import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Account, Role } from '@prisma/client';
import { map, Observable } from 'rxjs';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class SignInInterceptor implements NestInterceptor {
    constructor(private readonly accountServ: AccountService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((account: Account & { roles: Role[] }) => {
                return this.accountServ.generateToken(account);
            }),
        );
    }
}
