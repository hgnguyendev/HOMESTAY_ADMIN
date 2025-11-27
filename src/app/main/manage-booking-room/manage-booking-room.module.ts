import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ManageBookingRoom } from "./manage-booking-room.component";

const routes: Routes = [
    {
        path: '',
        component: ManageBookingRoom
    }
]

@NgModule({
    declarations: [ManageBookingRoom],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    exports: []
})

export class ManageBookingModule { }