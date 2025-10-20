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
  constructor(
    private _nzModal: NzModalService,
    private _homestayService: HomestayService,
    private _swalService: SwalService
  ) { }

  ngOnInit() {
    this.getAllHomestay();
  }

  homestay: any;

  async getAllHomestay() {
    try {
      const result = await this._homestayService.getAllHomestay();
      this.homestay = result;

    } catch (error: any) {

    }
  }

  handleOpenModalAddHomestay() {
    const modalRef = this._nzModal.create({
      nzWidth: '800px',
      nzTitle: 'Thêm phòng',
      nzContent: ModalAddHomestay,
      nzData :{
        type:'create'
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
}
