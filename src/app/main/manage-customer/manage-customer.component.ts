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
  filteredUsers: any[] = [];
  search = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };
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
      this.filteredUsers = response;
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

  handleSearch() {
    const name = this.search.name.toLowerCase();
    const email = this.search.email.toLowerCase();
    const phone = this.search.phone.toLowerCase();
    const address = this.search.address.toLowerCase();

    this.filteredUsers = this.users.filter((user: any) =>
      (!name || user.name?.toLowerCase().includes(name)) &&
      (!email || user.email?.toLowerCase().includes(email)) &&
      (!phone || user.phone?.toLowerCase().includes(phone)) &&
      (!address || user.address?.toLowerCase().includes(address))
    );
  }


}
