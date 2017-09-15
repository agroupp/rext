import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/observable/throw';

import { HttpRequest } from './http-request.class';
import { HttpResponse } from './http-response.class';

/**
 * Set of successful response http codes
 */
const successfulResponseCodes = new Set<number>()
    .add(200)
    .add(201)
    .add(202)
    .add(203)
    .add(204)
    .add(205)
    .add(206)
    .add(207)
    .add(208)
    .add(226);

/**
 * Main backend engine which uses XmlHttpRequest API
 * to send ajax requests
 */
export class Xhr {
    static send(request: HttpRequest<any>): Observable<any> {
        return Observable.create((observer: Observer<HttpResponse<any>>) => {
            const xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.open(request.method, request.url);
            xhr.onload = () => {
                let OK: boolean = (successfulResponseCodes.has(xhr.status)) ? true : false;
                let body: any | null = null;
                
                if (xhr.status !== 204) {
                  body = (xhr.response) ? xhr.response : xhr.responseText;
                }

                if (OK && typeof body === 'string') {
                    try {
                        body = JSON.parse(body);
                    } catch(err) {
                        OK = false;
                        body = { error: err, res: body };
                    }
                }
                
                if (OK) {
                    // Successful response
                    observer.next(new HttpResponse({
                        status: xhr.status,
                        statusText: xhr.statusText,
                        headers: xhr.getAllResponseHeaders(),
                        body: body
                    }));
                    // Request complete.
                    observer.complete();
                } else {
                  observer.error({ status: xhr.status, message: xhr.statusText, response: xhr.response });
                }        
            };
            xhr.onerror = (err: ErrorEvent) => {
                observer.error({ error: err });
            };
            xhr.send();
        });
    }
}