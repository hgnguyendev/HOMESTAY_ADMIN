import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from './_environments/enviroment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { initializeAppGlobal } from './app';
import { AppConfig } from './_config/app-config';
import { BaseSevice } from './service/base.service';
import { UserService } from './service/user.service';
import { AuthGuard } from './_guards/auth-guards';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NZ_I18N,vi_VN  } from 'ng-zorro-antd/i18n';



export function jwtOptionsFactory(af: AngularFireAuth) {
  return {
    tokenGetter: () => af.currentUser.then(u => u ? u.getIdToken(false) : ''),
    allowedDomains: environment.angularJwt.whitelistDomains,
    disallowedRoutes: environment.angularJwt.blacklistedDomains,
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection(),
    provideRouter(routes),
    provideAnimations(),
    AppConfig,
    BaseSevice,
    UserService,
    AuthGuard,
    { provide: NZ_I18N, useValue: vi_VN },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppGlobal,
      deps: [AppConfig],
      multi: true,
    },
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      JwtModule.forRoot({
        jwtOptionsProvider: {
          provide: JWT_OPTIONS,
          useFactory: jwtOptionsFactory,
          deps: [AngularFireAuth],
        }
      })
    ),
    provideHttpClient(
      withInterceptorsFromDi()
    )
  ]
};
