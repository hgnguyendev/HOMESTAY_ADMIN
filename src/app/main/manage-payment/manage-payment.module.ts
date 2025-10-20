import { NgModule } from "@angular/core";
import { ManagePayment } from "./manage-payment.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        component: ManagePayment
    }
]

@NgModule({
    declarations: [ManagePayment],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    exports: []
})

export class ManagePaymentModule { }