import { Component, Input } from '@angular/core';
import type { RumourListEntry } from '../services/rumours-list-index.service';

@Component({
	selector: 'app-rumours-list-item',
	standalone: false,
	templateUrl: './rumours-list-item.component.html',
	styleUrls: ['./rumours-list-item.component.scss']
})
export class RumoursListItemComponent {
	@Input() public rumour!: RumourListEntry;
}
