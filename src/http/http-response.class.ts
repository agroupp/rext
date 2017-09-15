
export class HttpResponse<T> {
    
    readonly body: T | null;
    readonly status: number;
    readonly statusText: string;
    readonly headers: {};

    constructor(data: {
        status?: number;
        statusText?: string;
        headers?: {};
        body?: T | null;
    }) {
        this.status = data.status || 200;
        this.statusText = data.statusText || 'Ok';
        this.headers = data.headers || {};
        this.body = data.body || null;
    }
}