import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RumourEngine } from 'src/@types/RumourEngine';
import { RumourEnginesService } from '../services/rumour-engines.service';

@Component({
  selector: 'rumours',
  templateUrl: './rumours.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
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

	constructor(private rumourEnginesService: RumourEnginesService) {
		this.rumourEngines = this.rumourEnginesService.getAll();
		this.uniqueYears = this.rumourEnginesService.getUniqueYears();
		this.uniqueTags = this.rumourEnginesService.getUniqueTags();
	}

	filterByYearEventHandler(filteredYear: string): void {
		this.filteredYear = filteredYear;
		this.filterRumours();
	}

	filterByTagEventHandler(filteredTag: string): void {
		this.filteredTag = filteredTag;
		this.filterRumours();
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
		let filtered = this.rumourEnginesService.getAll();

		if (this.filteredYear) {
			filtered = this.rumourEnginesService.filterByYear(filtered, this.filteredYear);
		}

		if (this.filteredTag) {
			filtered = this.rumourEnginesService.filterByTag(filtered, this.filteredTag);
		}

		if (this.unresolvedOnly) {
			filtered = this.rumourEnginesService.filterUnresolvedOnly(filtered);
		}

		this.rumourEngines = this.rumourEnginesService.orderBy(filtered, this.orderByValue);
	}

	useGridViewButtonEventHandler(useGridView: boolean): void {
		this.useGridView = useGridView;
	}
}
