import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SoftwareSystem } from './software-system.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SoftwareSystemService {

    private resourceUrl = 'api/software-systems';
    private resourceSearchUrl = 'api/_search/software-systems';

    constructor(private http: Http) { }

    create(softwareSystem: SoftwareSystem): Observable<SoftwareSystem> {
        const copy = this.convert(softwareSystem);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(softwareSystem: SoftwareSystem): Observable<SoftwareSystem> {
        const copy = this.convert(softwareSystem);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<SoftwareSystem> {
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

    private convert(softwareSystem: SoftwareSystem): SoftwareSystem {
        const copy: SoftwareSystem = Object.assign({}, softwareSystem);
        return copy;
    }
}
