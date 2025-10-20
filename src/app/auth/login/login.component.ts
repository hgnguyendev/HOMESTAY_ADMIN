import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class Login {

  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private _userService: UserService, private _router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  async handleLogin() {
    this.submitted = true;
    const { email, password } = this.loginForm.value

    if (this.loginForm.invalid) {
      return;
    }

    try {
      await this._userService.loginWithEmail(email, password)
      console.log("123")
      await this._userService.getUserInfo();
      this._router.navigate(['']);
    } catch (error: any) {

    }
  }




}
