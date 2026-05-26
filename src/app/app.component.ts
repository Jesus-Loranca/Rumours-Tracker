import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})

export class AppComponent {
	sectionTitle = 'Rumour Engines';

	onRumourEnginesEvent() {
	this.sectionTitle = 'Rumour Engines';
}

	onRumoursListEvent() {
	this.sectionTitle = 'Rumours List';
}
}
