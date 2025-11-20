import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overview',
  standalone: false,
  templateUrl: './overview.component.html',
})
export class Overview {
  @Input() description: string = '';
}
