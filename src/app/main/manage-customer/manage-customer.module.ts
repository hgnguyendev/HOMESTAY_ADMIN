import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ManageCustomer } from "./manage-customer.component";
import { NzTableModule } from 'ng-zorro-antd/table';

const routes: Routes = [
    {
        path: '',
        component: ManageCustomer
    }
]

@NgModule({
    declarations: [ManageCustomer],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NzTableModule
    ],
    exports: []
})

export class ManageCustomerModule { }