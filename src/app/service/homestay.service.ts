
import { Injectable } from '@angular/core';
import { BaseSevice } from './base.service';
import { AppConfig } from '../_config/app-config';

@Injectable({
    providedIn: 'root'
})
export class HomestayService {
    constructor(private _baseService: BaseSevice) { }

    getAllHomestay() {
        return this._baseService.get(`${AppConfig.settings.apiEndpoint}/homestay/get-homestay`);
    }

    createHomestay(data: any) {
        return this._baseService.post(`${AppConfig.settings.apiEndpoint}/homestay/create-homestay`, data);
    }

    editHomestay(id: string, data: any) {
        return this._baseService.put(`${AppConfig.settings.apiEndpoint}/homestay/edit-homestay/${id}`, data);
    }

    deleteHomestay(id: any) {
        return this._baseService.delete(`${AppConfig.settings.apiEndpoint}/homestay/delete-homestay/${id}`);
    }


}
