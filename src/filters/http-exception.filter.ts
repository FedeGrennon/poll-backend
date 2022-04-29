import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter
{
    catch(exception: HttpException, host: ArgumentsHost)
    {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const exceptionResponse = exception.getResponse();
        
        response
            .status(status)
            .json({
                statusCode: status,
                message: typeof(exceptionResponse) === 'string' ? exceptionResponse : (exceptionResponse as Error).message,
                timestamp: new Date().toISOString(),
                //path: request.url,
                //method: request.method,
                //body: request.body,
                //queryParams: request.query
            });
    }
}