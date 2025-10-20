import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppConfig } from './_config/app-config';

export function initializeAppGlobal(appConfig: AppConfig) {
  return () => appConfig.load();
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})



export class App {
  protected readonly title = signal('MANAGE_HOMESTAY_ADMIN');
}
