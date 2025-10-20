import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
})
export class Header {
  user: any;

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {
    this._userService.currentUser$.subscribe((user) => {
      this.user = user;
      console.log("user", this.user)
    });
  }

}
