import { Component } from '@angular/core';
import rumoursListData from '../../../@data/rumours-list.json';
import { RumoursListIndexService, RumourListEntry, RumoursListGameGroup } from '../services/rumours-list-index.service';

@Component({
	selector: 'app-rumours-list-items',
	standalone: false,
	templateUrl: './rumours-list-items.component.html',
	styleUrl: './rumours-list-items.component.scss'
})
export class RumoursListItemsComponent {
	public rumours: RumourListEntry[] = Array.isArray(rumoursListData)
		? rumoursListData as RumourListEntry[]
		: Object.values(rumoursListData as Record<string, RumourListEntry>);

	public groupedRumoursByGame: RumoursListGameGroup[] = [];

	constructor(private readonly rumoursListIndexService: RumoursListIndexService) {
		this.groupedRumoursByGame = this.rumoursListIndexService.createGroupedRumoursByGame(this.rumours);
	}

	public slugify(value: string): string {
		return this.rumoursListIndexService.slugify(value);
	}
}
