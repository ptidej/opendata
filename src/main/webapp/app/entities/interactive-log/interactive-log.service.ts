import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DateUtils } from 'ng-jhipster';

import { InteractiveLog } from './interactive-log.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class InteractiveLogService {

    private resourceUrl = 'api/interactive-logs';
    private resourceSearchUrl = 'api/_search/interactive-logs';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(interactiveLog: InteractiveLog): Observable<InteractiveLog> {
        const copy = this.convert(interactiveLog);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(interactiveLog: InteractiveLog): Observable<InteractiveLog> {
        const copy = this.convert(interactiveLog);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<InteractiveLog> {
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
    }

    private convert(interactiveLog: InteractiveLog): InteractiveLog {
        const copy: InteractiveLog = Object.assign({}, interactiveLog);
        copy.recorded = this.dateUtils
            .convertLocalDateToServer(interactiveLog.recorded);
        return copy;
    }
}
