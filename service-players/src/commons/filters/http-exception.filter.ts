import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof RpcException
        ? exception.getError()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof RpcException ? exception.message : exception;

    this.logger.error(
      `Http Status: ${status} Error message: ${JSON.stringify(
        message,
        undefined,
        2,
      )}`,
    );

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message,
    });
  }
}
