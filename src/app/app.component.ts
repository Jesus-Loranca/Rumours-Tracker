import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})

export class AppComponent {}
