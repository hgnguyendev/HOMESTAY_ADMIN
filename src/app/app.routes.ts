import { Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth-guards';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
    },
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./main/main.module').then((m) => m.MainModule)
    }
];
