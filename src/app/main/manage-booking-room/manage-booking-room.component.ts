import { Component } from '@angular/core';
import { HomestayBookedService } from '../../service/homestay-booked.service';

@Component({
  selector: 'app-manage-booking-room',
  standalone: false,
  templateUrl: './manage-booking-room.component.html',
  styleUrl: './manage-booking-room.component.scss'
})
export class ManageBookingRoom {

  listHomestayBooked: any;

  constructor(
    private _homestayBooked: HomestayBookedService
  ) { }

  ngOnInit() {
    this.getAllHomestayBooked();
  }

  async getAllHomestayBooked() {
    try {
      const response = await this._homestayBooked.getAllHomestayBooked();
      this.listHomestayBooked = response;
    } catch (error: any) {

    }
  }



}
