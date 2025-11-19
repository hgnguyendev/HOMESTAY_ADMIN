import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DetailsHomestay } from "./details-homestay/details-homestay.component";

@NgModule({
    declarations: [DetailsHomestay],
    imports: [
        CommonModule
    ],
    exports: [
        DetailsHomestay
    ]
})

export class ManageHomestaySharedModule { }