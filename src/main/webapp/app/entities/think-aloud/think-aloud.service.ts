import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DateUtils } from 'ng-jhipster';

import { ThinkAloud } from './think-aloud.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ThinkAloudService {

    private resourceUrl = 'api/think-alouds';
    private resourceSearchUrl = 'api/_search/think-alouds';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(thinkAloud: ThinkAloud): Observable<ThinkAloud> {
        const copy = this.convert(thinkAloud);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(thinkAloud: ThinkAloud): Observable<ThinkAloud> {
        const copy = this.convert(thinkAloud);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<ThinkAloud> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
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
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.registred = this.dateUtils
            .convertLocalDateFromServer(entity.registred);
    }

    private convert(thinkAloud: ThinkAloud): ThinkAloud {
        const copy: ThinkAloud = Object.assign({}, thinkAloud);
        copy.registred = this.dateUtils
            .convertLocalDateToServer(thinkAloud.registred);
        return copy;
    }
}
