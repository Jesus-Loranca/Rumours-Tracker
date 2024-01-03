import { Component } from '@angular/core';
import * as rumourEnginesData from '../../@data/rumour-engines.json';
import { RumourEngine } from 'src/@types/RumourEngine';

@Component({
  selector: 'rumours',
  templateUrl: './rumours.component.html'
})

export class RumoursComponent {
	rumourEngines: Array<RumourEngine> = [];

	constructor() {
		this.rumourEngines = Object.keys(rumourEnginesData)
			.map(key => rumourEnginesData[Number(key)])
			.filter(value => value !== undefined);
	}
}
