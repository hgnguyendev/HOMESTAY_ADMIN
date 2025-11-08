import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { SwalService } from '../../service/swal.service';

@Component({
  selector: 'app-manage-customer',
  standalone: false,
  templateUrl: './manage-customer.component.html',
  styleUrl: './manage-customer.component.scss'
})
export class ManageCustomer {
  users: any;
  constructor(
    private _userService: UserService,
    private _swalService: SwalService
  ) { }

  ngOnInit() {
    this.getAllUser();
  }

  async getAllUser() {
    try {
      const response = await this._userService.getAllUser();
      this.users = response;
    } catch (error: any) {
    }
  }

  async handleDeleteUser(item: any) {
    const confirm = await this._swalService.warning('Bạn có muốn xoá thành viên này không');
    if (!confirm) {
      return;
    }
    try {
      await this._userService.deleteUser(item._id);
      this._swalService.success('Xoá thành viên thành công');
      this.getAllUser();
    } catch (error: any) {
      this._swalService.success('Xoá thành viên chưa thành công');
    }
  }

}
