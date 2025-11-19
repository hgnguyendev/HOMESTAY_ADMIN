import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SwalService } from '../../../../service/swal.service';
import { HomestayService } from '../../../../service/homestay.service';

@Component({
  selector: 'app-details-homestay',
  standalone: false,
  templateUrl: './details-homestay.component.html',
})
export class DetailsHomestay {

  @Input() dataDetails: any;

  checkInDate: string = '';
  checkOutDate: string = '';
  totalPrice: number = 0
  guests: number = 1;
  nights: number = 0
  user_name: string = '';
  user_email: string = '';
  user_phone: string = '';
  dateInvalid: boolean = false;
  bookedList: any[] = [];

  @Output() emitCloseDetails = new EventEmitter<null>();


  constructor(
    private _swalService: SwalService,
    private _homestayService: HomestayService,
  ) { }
  totalNights(): number {
    if (!this.checkInDate || !this.checkOutDate) return 0;
    console.log(this.checkInDate, this.checkOutDate)

    const start = new Date(this.checkInDate);
    const end = new Date(this.checkOutDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

    return diffDays > 0 ? diffDays : 0;
  }

  updateTotalPrice() {
    const nights = this.totalNights();
    this.nights = nights;
    this.totalPrice = nights * this.dataDetails.price;
  }

  getTotalPrice(): number {
    const nights = this.totalNights();
    return nights > 0 ? nights * this.dataDetails.price : this.dataDetails.price;
  }




  selectedImage: string = '';

  activeTab = 'overview';

  menuTab = [
    { id: 1, name: 'Tổng quan', type: 'overview' },
    { id: 2, name: 'Tiện nghi', type: 'facilities' },
    { id: 3, name: 'Đánh giá', type: 'comment' },
    { id: 4, name: 'Lịch phòng còn trống', type: 'emty_room' }
  ]

  ngOnInit() {
    if (this.dataDetails?.images?.length > 0) {
      this.selectedImage = this.dataDetails.images[0];
    }
  }

  handleCloseDetails() {
    this.emitCloseDetails.emit(null);
  }



}
