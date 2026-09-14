import { Component, Input, OnDestroy } from '@angular/core';
import type { RumourListEntry } from '../services/rumours-list-index.service';

@Component({
	selector: 'app-rumours-list-item',
	standalone: false,
	templateUrl: './rumours-list-item.component.html',
	styleUrls: ['./rumours-list-item.component.scss']
})
export class RumoursListItemComponent implements OnDestroy {
	@Input() public rumour!: RumourListEntry;
	public showContentModal = false;

	public get canOpenContent(): boolean {
		if (!this.rumour?.message) {
			return false;
		}

		const contents = Array.isArray(this.rumour.message.contents)
			? this.rumour.message.contents
			: [];
		const quotes = Array.isArray(this.rumour.message.quotes)
			? this.rumour.message.quotes
			: [];

		const hasRealContent = contents.some(item => typeof item === 'string' && item.trim() !== '');
		const hasRealQuote = quotes.some(item => typeof item === 'string' && item.trim() !== '');

		return hasRealContent || hasRealQuote;
	}

	public openContentModal(): void {
		if (!this.canOpenContent) {
			return;
		}
		this.showContentModal = true;
		document.body.classList.add('modal-open');
	}

	public closeContentModal(): void {
		this.showContentModal = false;
		document.body.classList.remove('modal-open');
	}

	public ngOnDestroy(): void {
		document.body.classList.remove('modal-open');
	}

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
