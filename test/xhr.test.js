const Xhr = require('../lib/http/xhr.class').Xhr;
const HttpRequest = require('../lib/http/http-request.class').HttpRequest;
const Rx = require('rxjs').Rx;

describe('Xhr', function(){
    it('shoud get response', () => {
        return Xhr.send(new HttpRequest('GET', 'https://api.mail.ink/'))
        .toPromise()
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.statusText).toBe('OK');
            expect(res.body.success).toBeTruthy();
        });
    });
})