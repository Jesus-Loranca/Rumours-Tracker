import { Component } from '@angular/core';
import * as rumourEnginesData from '../../@data/rumour-engines.json';
import { RumourEngine } from 'src/@types/RumourEngine';

@Component({
  selector: 'rumours',
  templateUrl: './rumours.component.html'
})

export class RumoursComponent {
	rumourEngines: Array<RumourEngine> = [];
	uniqueYears: Array<string> = [];
	uniqueTags: Array<string> = [];
	filteredYear: string = '';
	filteredTag: string = '';
	orderByValue: string = 'oldest';
	unresolvedOnly: boolean = false;
	useGridView: boolean = false;
	yearFilterDisabled: boolean = false;
	tagFilterDisabled: boolean = false;

	constructor() {
		this.getRumourEnginesData();
		this.uniqueYears = this.getUniqueYears();
		this.uniqueTags = this.getUniqueTags();
	}

	getRumourEnginesData(): void {
		this.rumourEngines = Object.keys(rumourEnginesData)
		.map(key => rumourEnginesData[Number(key)])
		.filter(value => value !== undefined);
	}

	getUniqueYears(): Array<string> {
		return Array.from(new Set(this.rumourEngines.map(rumourEngine => String(new Date(rumourEngine.date).getFullYear()))));
	}

	getUniqueTags(): Array<string> {
		return Array.from(new Set(this.rumourEngines.flatMap(rumourEngine => rumourEngine.tags))).sort();;
	}

	filterByYear(year: string): void {
		this.rumourEngines = this.rumourEngines.filter(rumourEngine => rumourEngine.date.includes(year));
	}

	filterByYearEventHandler(filteredYear: string): void {
		this.filteredYear = filteredYear;
		this.filterRumours();
	}

	filterByTag(tag: string): void {
		this.rumourEngines = this.rumourEngines.filter(rumourEngine => rumourEngine.tags.includes(tag));
	}

	filterByTagEventHandler(filteredTag: string): void {
		this.filteredTag = filteredTag;
		this.filterRumours();
	}

	flipRumoursOrder(): void {
		this.rumourEngines = this.rumourEngines.reverse();
	}

	getUnresolvedRumours(): void {
		this.rumourEngines = this.rumourEngines.filter(rumourEngine => !rumourEngine.resolvedDate);
	}

	orderByEventHandler(orderByValue: string): void {
		this.orderByValue = orderByValue;
		this.filterRumours();

	}

	unresolvedButtonEventHandler(unresolvedOnly: boolean): void {
		this.unresolvedOnly = unresolvedOnly;
		this.hideSolvedRumoursOptions();
		this.filterRumours();
  }

	hideSolvedRumoursOptions(): void {
		if (this.unresolvedOnly) {
			this.filteredYear = '';
			this.filteredTag = '';
			this.yearFilterDisabled = true;
			this.tagFilterDisabled = true;
		} else {
			this.yearFilterDisabled = false;
			this.tagFilterDisabled = false;
		}
	}

	filterRumours(): void {
		this.getRumourEnginesData();

		if (this.filteredYear) {
			this.filterByYear(this.filteredYear)
		}

		if (this.filteredTag) {
			this.filterByTag(this.filteredTag)
		}

		if (this.unresolvedOnly) {
			this.getUnresolvedRumours();
		}

		if (this.orderByValue === 'current') {
			this.flipRumoursOrder();
		}
	}

	useGridViewButtonEventHandler(useGridView: boolean): void {
		this.useGridView = useGridView;
	}
}
