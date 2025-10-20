import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class BaseSevice {
    constructor(private _httpClient: HttpClient) { }

    async get(
        url: string,
        options = {} as any,
        requesId: any = null,
        isShowMsg = true
    ): Promise<any> {
        try {
            const result = await this._httpClient
                .get<any>(url, options || {})
                .toPromise();
            return this._extractResult(result);
        } catch (error: any) {
            console.error('BaseService GET error:', error);
            return this._handleError(error, isShowMsg);
        }
    }

    async post(
        url: string,
        data = {},
        options = {} as any,
        isShowMsg = true
    ): Promise<any> {
        try {
            const result = await this._httpClient
                .post<any>(url, data || {}, options || {})
                .toPromise();
            return this._extractResult(result);
        } catch (error) {
            console.error('BaseService POST error:', error);
            return this._handleError(error, isShowMsg);
        }
    }

    async put(
        url: string,
        data = {},
        options = {} as any,
        requestId: any = null,
        isShowMsg = true
    ): Promise<any> {
        try {
            const result = await this._httpClient
                .put<any>(url, data || {}, options || {})
                .toPromise();
            return this._extractResult(result);
        } catch (error) {
            return this._handleError(error, isShowMsg);
        }
    }

    async delete(
        url: string,
        options = {} as any,
        requestId: any = null,
        isShowMsg = true
    ): Promise<any> {
        try {
            const result = await this._httpClient
                .delete<any>(url, options || {})
                .toPromise();
            return this._extractResult(result);
        } catch (error) {
            return this._handleError(error, isShowMsg);
        }
    }

    async patch(
        url: string,
        body: any,
        options = {} as any,
        requestId: any = null,
        isShowMsg = true
    ): Promise<any> {
        try {
            const result = await this._httpClient
                .patch<any>(url, body, options || {})
                .toPromise();
            return this._extractResult(result);
        } catch (error) {
            return this._handleError(error, isShowMsg);
        }
    }

    private _extractResult(result: any) {

        if (result && result['success'] === false) {
            console.warn('API returned success: false');
            return Promise.reject(result);
        }

        if (result && result.data !== undefined) {
            return result.data;
        }

        return result;
    }

    private async _handleError(
        error: any,
        isShowMsg = true
    ): Promise<any> {
        console.error('BaseService error handler:', error);
        return Promise.reject(error);
    }
}
