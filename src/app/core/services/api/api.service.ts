import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ExceptionService } from './../exception/exception.service';
import { AppStorage } from './../authentication/app-storage.service';
import { LoadingService } from './../loading/loading.service';
import { EndpointService, ApiEndpointType, IApiEndpoint } from '../../../config';
// import { IModel } from './../../shared/IModel';
import 'rxjs/Rx';

export interface ApiParam {
    data?: Object;
    queryParams?: Object;
    pathParams?: Object;
    // query: Object;
}

export interface Paginator {
    currentPage: number;
    limit: number;
    nextPage: string;
    previousPage: number;
    totalCount: number;
    totaPages: number;
}

interface ApiResponse {
    result: ApiResult;
    success: boolean;
}

interface ApiResult {
    data;
    paginator?: Paginator;
    message: string;
}

@Injectable()
export class ApiService {

    constructor(
        private http: Http,
        private exceptionService: ExceptionService,
        private appStorage: AppStorage,
        private endpointService: EndpointService,
        private loadingService: LoadingService) { }


    // request(name: string, params?: ApiParam): Observable<ApiResponse> {
        request(name: string, params?: ApiParam): Observable<any> {
        const endpoint = this.getEndpoint(name);
        const url = this.addPathParamsIfAny(endpoint.url, params);

        const requestOptions: RequestOptionsArgs = {
            headers: this.getHeaders(),
            method: endpoint.method,
            body: params ? params.data : {},
            search: this.getQueryParams(params)
        };

        this.loadingService.show();
        return this.http.request(url, requestOptions)
            // .map(res => this.extractData<ApiResponse>(res))
            .map(res => this.extractData<any>(res))
            .catch(this.exceptionService.catchBadResponse)
            .finally(() => this.loadingService.hide());

    }

    private addPathParamsIfAny(url: string, data: ApiParam): string {

        if (data && data.pathParams) {
            for (const key in data.pathParams) {
                url = url.replace(key, data.pathParams[key]);
            }
        }
        return url;
    }

    private getQueryParams(params: ApiParam): URLSearchParams {
        const queryParam = new URLSearchParams();

        if (params && params.queryParams) {
            for (const key in params.queryParams) {
                const value = params.queryParams[key];
                queryParam.append(key, value);
            }
        }
        return queryParam;
    }

    private getEndpoint(name: string): IApiEndpoint {
        const endpoint = this.endpointService.get(name);

        if (!endpoint) {
            throw new Error('No endpoint is registered with' + name);
        }
        return endpoint;
    }

    private getHeaders(): Headers {
        const token = this.appStorage.get('auth_token');
        const requestHeaders = new Headers({ 'Content-Type': 'application/json' });

        if (token && !requestHeaders.has('authorization')) {
            requestHeaders.append('authorization', 'Token ' + token);
        }

        return requestHeaders;
    }

    private extractData<R>(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        const body = res.json ? res.json() : null;

        // if (!body.success)
        //     throw new Error('Request was not successfull with an Error ->: ' + body.result.message);

        return <R>(body || {});
    }
}
