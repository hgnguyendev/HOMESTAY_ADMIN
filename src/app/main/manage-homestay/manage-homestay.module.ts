import { NgModule } from "@angular/core";
import { ManageHomestay } from "./manage-homestay.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NzModalModule } from "ng-zorro-antd/modal";
import { RouterModule, Routes } from "@angular/router";
import { ModalAddHomestay } from "./components/modal-add-homestay/modal-add-homestay.component";
import { SharedModule } from "../../_shared/shared.module";

const routes: Routes = [
    {
        path: '',
        component: ManageHomestay
    }
]

@NgModule({
    declarations: [ManageHomestay, ModalAddHomestay],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        SharedModule,
        NzModalModule
    ],
    exports: []
})

export class ManageHomestayModule { }