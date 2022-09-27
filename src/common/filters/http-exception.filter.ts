import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const request = context.getRequest();
    const response = context.getResponse();
    const status = exception.getStatus()
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.getResponse();

    const parsedMessage =
      typeof message === 'string'
        ? message
        : JSON.parse(JSON.stringify(message));

    Logger.error(
      `${status} - ${parsedMessage} on path ${request.method}${request.path}`,
    );

    response.status(status).json({
      status,
      message,
      timestamp: new Date().getTime(),
    });
  }
}
