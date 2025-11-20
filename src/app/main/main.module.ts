import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MainComponent } from "./main.component";
import { RouterModule, Routes } from "@angular/router";
import { LayoutModule } from "../layout/layout.module";

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'home',
                loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
            },
            {
                path: 'manage-homestay',
                loadChildren: () => import('./manage-homestay/manage-homestay.module').then((m) => m.ManageHomestayModule)
            },
            {
                path: 'manage-booking-room',
                loadChildren: () => import('./manage-booking-room/manage-booking-room.module').then((m) => m.ManageBookingModule)
            },
            {
                path: 'manage-customer',
                loadChildren: () => import('./manage-customer/manage-customer.module').then((m) => m.ManageCustomerModule)
            },
            {
                path: '**',
                redirectTo: 'home'
            }
        ]
    }
]

@NgModule({
    declarations: [MainComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LayoutModule
    ],
    exports: [],
})

export class MainModule { }