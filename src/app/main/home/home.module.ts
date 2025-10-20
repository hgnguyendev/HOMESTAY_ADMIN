import { NgModule } from "@angular/core";
import { Home } from "./home.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
    {
        path: '', component: Home
    }
]

@NgModule({
    declarations: [Home],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    exports: []
})

export class HomeModule { }