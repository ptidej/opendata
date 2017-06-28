import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DateUtils } from 'ng-jhipster';

import { Defect } from './defect.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DefectService {

    private resourceUrl = 'api/defects';
    private resourceSearchUrl = 'api/_search/defects';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(defect: Defect): Observable<Defect> {
        const copy = this.convert(defect);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(defect: Defect): Observable<Defect> {
        const copy = this.convert(defect);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Defect> {
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
        entity.recorded = this.dateUtils
            .convertLocalDateFromServer(entity.recorded);
        entity.modified = this.dateUtils
            .convertLocalDateFromServer(entity.modified);
    }

    private convert(defect: Defect): Defect {
        const copy: Defect = Object.assign({}, defect);
        copy.recorded = this.dateUtils
            .convertLocalDateToServer(defect.recorded);
        copy.modified = this.dateUtils
            .convertLocalDateToServer(defect.modified);
        return copy;
    }
}
