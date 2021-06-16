import { MessagesConstant } from './../utilities/messages-constants';
import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { MessagingNotification } from '../utilities/messaging-notification';

@Injectable({
    providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
    construct() { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error) => {
                console.log(error.status);
                let errorMessage = '';
                // if true = client-side error else backend error
                errorMessage =
                    error instanceof ErrorEvent
                        ? `Error: ${error.error.message}`
                        : (errorMessage = `Server-side error: ${error.status} ${error.message}`);
                switch (error.status) {
                    case 400:
                        MessagingNotification.create(MessagingNotification.WARNING_TYPE,
                            MessagesConstant.WARNING_TITLE, MessagesConstant.BAD_REQUEST
                        );
                        break;
                    case 403:
                        MessagingNotification.create(MessagingNotification.WARNING_TYPE,
                            MessagesConstant.WARNING_TITLE, MessagesConstant.GENERIC_ERROR
                        );
                        break;
                    case 404:
                        MessagingNotification.create(MessagingNotification.WARNING_TYPE,
                            MessagesConstant.WARNING_TITLE, MessagesConstant.NOT_FOUND
                        );
                        break;
                    case 500:
                        MessagingNotification.create(MessagingNotification.ERROR_TYPE,
                            MessagesConstant.ERROR_TITLE, MessagesConstant.GENERIC_ERROR
                        );
                        break;
                    default:
                        break;
                }
                return throwError(errorMessage);
            })
        );
    }
}
