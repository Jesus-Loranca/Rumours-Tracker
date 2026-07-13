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

	showRumourReactionIcon(rumour: RumourListEntry): string {
		switch (true) {
			case rumour.isLike:
				return '❤️';
			case rumour.isThanks:
				return '🏆';
			case rumour.isLoveIt:
				return '😍';
			case rumour.isSadFace:
				return '😢';
			case rumour.isConfusedFace:
				return '😕';
			case rumour.isLaughFace:
				return '​😄​';
			default:
				return '❤️';
		}
	}

	isRecentRumour(rumour: RumourListEntry): boolean {
		const rumourDate = new Date(rumour.date);
		const now = new Date();
		const diffMs = now.getTime() - rumourDate.getTime();
		const diffDays = diffMs / (1000 * 60 * 60 * 24);

		return diffDays <= 31;
	}
}
