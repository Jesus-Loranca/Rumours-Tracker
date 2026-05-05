import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})

export class FooterComponent {
	getCurrentYear(): string {
		return String(new Date().getFullYear());
	}
}
