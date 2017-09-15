
/**
 * Outgoing Http Request
 */
export class HttpRequest<T> {
    /**
     * Http Method
     */
    method: string;
    /**
     * Outgoing Url
     */
    url: string;

    /**
     * 
     */
    constructor(method: 'GET', url: string, options?: {});
    constructor(method: 'POST', url: string, body: T | null, options?: {});
    constructor(method: string, url: string, bodyOrOptions: T | {} | null, options?: {}) {
        this.method = method.toUpperCase();
        this.url = url;
    }
}