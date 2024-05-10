import { Component, Input } from '@angular/core';
import { RumourEngine } from 'src/@types/RumourEngine';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html'
})

export class CounterComponent {
	@Input() rumourEngines: Array<RumourEngine> = [];

	getRumourEnginesCount(): string {
		return String(this.rumourEngines.length);
	}

}
