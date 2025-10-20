import { NgModule } from "@angular/core";
import { Login } from "./login/login.component";
import { AuthComponent } from "./auth.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '', component: AuthComponent
    }
]

@NgModule({
    declarations: [Login, AuthComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        FormsModule,

    ],
    exports: []
})

export class AuthModule { }