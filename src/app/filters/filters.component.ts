import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html'
})

export class FiltersComponent {
	@Input() years: Array<string> = [];
	@Input() tags: Array<string> = [];
	@Output() filterByYearEvent: EventEmitter<string> = new EventEmitter<string>();
	@Output() filterByTagEvent: EventEmitter<string> = new EventEmitter<string>();
	@Output() orderByEvent: EventEmitter<string> = new EventEmitter<string>();
	@Output() unresolvedButtonEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

	filterByYear: string = '';
	filterByTag: string = '';
	unresolvedOnly: boolean = false;
	orderBy: string = 'oldest';
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
		this.unresolvedButtonEvent.emit(this.unresolvedOnly);
	}

	scrollToBottom(): void {
		window.scroll({
			top: document.body.scrollHeight,
			left: 0,
			behavior: 'smooth'
		});
	}
}
