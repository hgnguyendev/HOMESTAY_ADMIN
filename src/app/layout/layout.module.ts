import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { CommonModule } from "@angular/common";
import { Navbar } from "./navbar/navbar.component";
import { Header } from "./header/header.component";

@NgModule({
    declarations: [LayoutComponent, Navbar, Header],
    imports: [
        CommonModule,
    ],
    exports: [
        LayoutComponent
    ]
})

export class LayoutModule { }