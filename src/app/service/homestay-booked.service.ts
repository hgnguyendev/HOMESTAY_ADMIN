
import { Injectable } from '@angular/core';
import { BaseSevice } from './base.service';
import { AppConfig } from '../_config/app-config';

@Injectable({
    providedIn: 'root'
})
export class HomestayBookedService {
    constructor(private _baseService: BaseSevice) { }

    getAllHomestayBooked() {
        return this._baseService.get(`${AppConfig.settings.apiEndpoint}/homestay-booking/get-all-booked`);
    }
}
