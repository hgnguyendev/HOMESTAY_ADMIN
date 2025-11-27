import { NgModule } from "@angular/core";
import { ManageHomestay } from "./manage-homestay.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzModalModule } from "ng-zorro-antd/modal";
import { RouterModule, Routes } from "@angular/router";
import { ModalAddHomestay } from "./components/modal-add-homestay/modal-add-homestay.component";
import { SharedModule } from "../../_shared/shared.module";
import { ManageHomestaySharedModule } from "./shared/manage-homestay-shared.module";

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
        NzModalModule,
        FormsModule,
        ManageHomestaySharedModule
    ],
    exports: []
})

export class ManageHomestayModule { }