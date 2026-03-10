import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html'
})

export class FiltersComponent {
	@Input() years: Array<string> = [];
	@Input() tags: Array<string> = [];
	@Input() yearFilterDisabled: boolean = false;
	@Input() tagFilterDisabled: boolean = false;
	@Output() filterByYearEvent: EventEmitter<string> = new EventEmitter<string>();
	@Output() filterByTagEvent: EventEmitter<string> = new EventEmitter<string>();
	@Output() orderByEvent: EventEmitter<string> = new EventEmitter<string>();
	@Output() unresolvedButtonEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() useGridViewButtonEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

	filterByYear: string = '';
	filterByTag: string = '';
	orderBy: string = 'oldest';
	unresolvedOnly: boolean = false;
	useGridView: boolean = false;
	unresolvedButtonText: string = 'Unresolved Only';

	onFilterByYearChange(): void {
		this.filterByYearEvent.emit(this.filterByYear);
	}

	onFilterByTagChange(): void {
		this.filterByTagEvent.emit(this.filterByTag);
	}

	onOrderByChange(): void {
		this.orderByEvent.emit(this.orderBy);
	}

	triggerUnresolvedButton(): void {
		this.unresolvedOnly = !this.unresolvedOnly;
		this.unresolvedButtonText = !this.unresolvedOnly ? 'Unresolved Only': 'All the Rumours';

		if (this.unresolvedOnly) {
			this.filterByYear = '';
			this.filterByTag = '';
			this.onFilterByYearChange();
			this.onFilterByTagChange();
		}

		if (!this.unresolvedOnly) {
			this.useGridView = false;
		}

		this.unresolvedButtonEvent.emit(this.unresolvedOnly);
		this.useGridViewButtonEvent.emit(this.useGridView);
	}

	triggerGridView(): void {
		if (!this.unresolvedOnly) {
			return;
		}

		this.useGridView = !this.useGridView;
		this.useGridViewButtonEvent.emit(this.useGridView);
	}
}
