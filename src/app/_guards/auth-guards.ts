import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, first, map, of } from 'rxjs';
import { UserService } from '../service/user.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private _userService: UserService,
        private router: Router,) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._userService.currentUser$.pipe(
            first(),
            map((user: any) => {
                if (!user) {
                    this.router.navigate(['auth']);
                    return false;
                }
                return true;
            }),
            catchError((error: any) => {
                this.router.navigate(['auth']);
                return of(false);
            })
        );
    }
}
