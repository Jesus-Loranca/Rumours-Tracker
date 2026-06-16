import { Component, Input } from '@angular/core';
import type { RumourListEntry } from '../rumours-list-items/rumours-list-items.component';

@Component({
	selector: 'app-rumours-list-item',
	standalone: false,
	templateUrl: './rumours-list-item.component.html'
})
export class RumoursListItemComponent {
	@Input() public rumour!: RumourListEntry;
}
