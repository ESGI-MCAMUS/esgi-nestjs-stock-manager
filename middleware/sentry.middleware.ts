import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import * as Sentry from '@sentry/node';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {

        // On récupère la requête et la réponse
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        // On récupère le status de l'exception
        const status = exception.getStatus();

        // On construit les données à envoyer
        const data = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
        }

        // On envoie l'exception à Sentry
        Sentry
            .captureException(
                exception,
                { extra: data }
            );

        // On envoie la réponse au client
        response
            .status(status)
            .json(data);
    }
}