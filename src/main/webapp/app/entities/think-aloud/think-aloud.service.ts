import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ThinkAloud } from './think-aloud.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ThinkAloudService {

    private resourceUrl = 'api/think-alouds';
    private resourceSearchUrl = 'api/_search/think-alouds';

    constructor(private http: Http) { }

    create(thinkAloud: ThinkAloud): Observable<ThinkAloud> {
        const copy = this.convert(thinkAloud);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(thinkAloud: ThinkAloud): Observable<ThinkAloud> {
        const copy = this.convert(thinkAloud);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<ThinkAloud> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(thinkAloud: ThinkAloud): ThinkAloud {
        const copy: ThinkAloud = Object.assign({}, thinkAloud);
        return copy;
    }
}
