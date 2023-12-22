import { Component } from '@angular/core';
import { RumourEngine } from 'src/@types/RumourEngine';
import * as rumourEnginesData from '../../@data/rumour-engines.json';

@Component({
  selector: 'vertical-timeline',
  templateUrl: './vertical-timeline.component.html',
  styleUrls: ['./vertical-timeline.component.scss']
})

export class VerticalTimelineComponent  {
	rumourEngines: Array<RumourEngine> = [];

	constructor() {
		this.rumourEngines = Object.keys(rumourEnginesData).map(key => rumourEnginesData[Number(key)]);
	}

	getDetailedDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	}

	getResolvedDate(createdString: string, resolvedString: string): number {
		const createdgDate = new Date(createdString);
		const resolvedDate = new Date(resolvedString);
		const timeDifference = resolvedDate.getTime() - createdgDate.getTime();

		return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
	}

	getYear(dateString: string): number {
		return new Date(dateString).getFullYear();
	}
}
