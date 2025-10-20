import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OverlayLoading } from "./components/overlay-loading/overlay-loading.component";

@NgModule({
    declarations: [OverlayLoading],
    imports: [
        CommonModule
    ],
    exports: [
        OverlayLoading
    ]
})

export class SharedModule { }