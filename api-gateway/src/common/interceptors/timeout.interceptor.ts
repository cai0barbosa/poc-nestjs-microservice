import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, timeout } from 'rxjs';

export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(timeout(10000));
  }
}
