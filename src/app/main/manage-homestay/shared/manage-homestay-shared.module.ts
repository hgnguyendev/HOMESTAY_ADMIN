import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DetailsHomestay } from "./details-homestay/details-homestay.component";
import { Overview } from "./overview/overview.component";
import { TienNghi } from "./tien-nghi/tien-nghi.component";
import { EmtyRoom } from "./emty-room/emty-room.component";
import { Comments } from "./comments/comments.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [DetailsHomestay, Overview, TienNghi, EmtyRoom, Comments],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        DetailsHomestay,
        Overview,
        TienNghi,
        EmtyRoom,
        Comments
    ]
})

export class ManageHomestaySharedModule { }