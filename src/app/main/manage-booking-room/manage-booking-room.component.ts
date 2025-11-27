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
  searchText: string = '';

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

  get filteredBookings() {
    if (!this.searchText) return this.listHomestayBooked;

    const text = this.searchText.toLowerCase();

    return this.listHomestayBooked.filter((item: any) =>
      item.roomName?.toLowerCase().includes(text) ||
      item.user_name_placer?.toLowerCase().includes(text) ||
      item.address?.toLowerCase().includes(text)
    );
  }



}
