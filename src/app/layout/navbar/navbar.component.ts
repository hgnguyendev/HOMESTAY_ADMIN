import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
})
export class Navbar {
  constructor(
    private _router: Router,
  ) { }
  menuItems: any[] = [
    { title: 'Trang chủ', url: '/home', submenu: [], icon: 'house', isActive: false },
    { title: 'Quản lí HomeStay', url: '/manage-homestay', submenu: [], icon: 'houses', isActive: false },
    { title: 'Quản lí đặt phòng', url: '/manage-booking-room', submenu: [], icon: 'hospital', isActive: false },
    { title: 'Quản lí thanh toán', url: '/manage-payment', submenu: [], icon: 'credit-card', isActive: false },
    { title: 'Quản lí khách hàng', url: '/manage-customer', submenu: [], icon: 'people', isActive: false },
  ];

  isCollapsed: boolean = false


  isActiveRouter(url: string) {
    return this._router.url.startsWith(url);
  }

  handleClickMenu(urlId: string) {
    this.menuItems = this.menuItems.map((item) => ({
      ...item,
      isActive: item.url === urlId,
    }));
    this._router.navigate([`${urlId}`]).then();
  }

  handleChangeSizeNavbar() {
    this.isCollapsed = !this.isCollapsed
  }
}
