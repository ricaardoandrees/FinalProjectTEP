import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogService } from './Log.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logService: LogService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const user = req.user || undefined;
        const ruta = req.route?.path || req.url;
        const metodo = req.method;
        const accion = `Acceso a ${ruta}`;
            return next.handle().pipe(
                tap(() => {
                this.logService.createLog(accion, user, ruta, metodo);
                })
            );
        }
} 