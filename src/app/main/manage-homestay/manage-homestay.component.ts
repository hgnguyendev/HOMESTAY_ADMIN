import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalAddHomestay } from './components/modal-add-homestay/modal-add-homestay.component';
import { HomestayService } from '../../service/homestay.service';
import { SwalService } from '../../service/swal.service';

@Component({
  selector: 'app-manage-homestay',
  standalone: false,
  templateUrl: './manage-homestay.component.html',
  styleUrl: './manage-homestay.component.scss'
})
export class ManageHomestay {

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  page: number = 1
  detail: any;
  originalHomestays: any[] = [];

  search = {
    roomName: '',
    address: '',
    minPrice: '',
    maxPrice: '',
    startDate: '',
    endDate: ''
  };


  constructor(
    private _nzModal: NzModalService,
    private _homestayService: HomestayService,
    private _swalService: SwalService
  ) { }

  ngOnInit() {
    this.getAllHomestay();
  }

  homestays: any;

  async getAllHomestay() {
    try {
      const params = {
        page: this.currentPage,
        limit: this.itemsPerPage,
        address: this.search.address || '',
        minPrice: this.search.minPrice || '',
        maxPrice: this.search.maxPrice || '',
        startDate: this.search.startDate || '',
        endDate: this.search.endDate || '',
      };

      const response: any = await this._homestayService.getAllHomestay(params);

      this.homestays = response.data || [];
      this.originalHomestays = [...this.homestays];
      this.totalItems = response.total || 0;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    } catch (error: any) {
      console.error(error);
    }
  }


  handleOpenModalAddHomestay() {
    const modalRef = this._nzModal.create({
      nzWidth: '800px',
      nzTitle: 'Thêm phòng',
      nzContent: ModalAddHomestay,
      nzData: {
        type: 'create'
      },
      nzCentered: true,
      nzFooter: null
    })
    modalRef.afterClose.subscribe((result) => {
      if (result) {
        this.getAllHomestay()
      }
    })
  }

  handleEditHomestay(homestay: any) {
    const modalRef = this._nzModal.create({
      nzWidth: '800px',
      nzTitle: 'Sửa Homestay của bạn',
      nzContent: ModalAddHomestay,
      nzData: {
        data: homestay,
        type: 'edit'
      },
      nzCentered: true,
      nzFooter: null
    })
    modalRef.afterClose.subscribe((result) => {
      if (result) {
        this.getAllHomestay();
      }
    })
  }

  async handleDeleteHomestay(id: string) {
    if (!id) {
      return;
    }

    const confirm = await this._swalService.warning('Bạn có muốn xoá homestay này không');
    if (!confirm) {
      return;
    }
    try {
      await this._homestayService.deleteHomestay(id);
      this.getAllHomestay();
      this._swalService.success('Xoá homestay thành công')
    } catch (error: any) {
      this._swalService.error('Xoá Homestay chưa thành công')
    }
  }

  handleDetailHomestay(item: any) {
    this.detail = item;
  }

  handleCloseDetails(event: any) {
    this.detail = event;
  }

  handleClientSearch() {
    const name = this.search.roomName.toLowerCase();
    const min = Number(this.search.minPrice) || 0;
    const max = Number(this.search.maxPrice) || Infinity;
    const addr = this.search.address.toLowerCase();

    this.homestays = this.originalHomestays.filter((item: any) => {
      const matchName = item.roomName.toLowerCase().includes(name);
      const matchAddress = item.address?.toLowerCase().includes(addr);
      const matchPrice = item.price >= min && item.price <= max;

      return matchName && matchAddress && matchPrice;
    });
  }


}
