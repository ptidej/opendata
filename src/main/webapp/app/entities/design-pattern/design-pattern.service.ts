import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { DesignPattern } from './design-pattern.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DesignPatternService {

    private resourceUrl = 'api/design-patterns';
    private resourceSearchUrl = 'api/_search/design-patterns';

    constructor(private http: Http) { }

    create(designPattern: DesignPattern): Observable<DesignPattern> {
        const copy = this.convert(designPattern);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(designPattern: DesignPattern): Observable<DesignPattern> {
        const copy = this.convert(designPattern);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<DesignPattern> {
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

    private convert(designPattern: DesignPattern): DesignPattern {
        const copy: DesignPattern = Object.assign({}, designPattern);
        return copy;
    }
}
