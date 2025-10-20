import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ManageCustomer } from "./manage-customer.component";

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
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    exports: []
})

export class ManageCustomerModule { }