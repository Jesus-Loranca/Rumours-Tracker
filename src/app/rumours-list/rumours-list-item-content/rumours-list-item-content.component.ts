import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { RumourListEntry } from '../services/rumours-list-index.service';

@Component({
	selector: 'app-rumours-list-item-content',
	standalone: false,
	templateUrl: './rumours-list-item-content.component.html',
	styleUrls: ['./rumours-list-item-content.component.scss']
})
export class RumoursListItemContentComponent {
	@Input() public rumour!: RumourListEntry;
	@Input() public visible = false;
	@Output() public close = new EventEmitter<void>();

	public openUrl(): void {
		if (!this.sourceUrl) {
			return;
		}
		window.open(this.sourceUrl, '_blank', 'noopener,noreferrer');
	}

	public closeDialog(): void {
		this.close.emit();
	}

	public get rumourDate(): string {
		return this.formatDate(this.rumour.date);
	}

	public get sourceUrl(): string | null {
		return this.rumour.source?.[0] ?? null;
	}

	public get isReaction(): boolean {
		return !!this.rumour.message?.isReaction;
	}

	public get reactionEmoji(): string {
		switch (true) {
			case this.rumour.isLike:
				return '❤️';
			case this.rumour.isThanks:
				return '🏆';
			case this.rumour.isLoveIt:
				return '😍';
			case this.rumour.isSadFace:
				return '😢';
			case this.rumour.isConfusedFace:
				return '😕';
			case this.rumour.isLaughFace:
				return '😄';
			default:
				return '❤️';
		}
	}

	public get quote(): string | null {
		return Array.isArray(this.rumour.message.quotes) && this.rumour.message.quotes.length > 0
			? this.rumour.message.quotes[0]
			: null;
	}

	public get quoteLines(): string[] {
		return this.quote?.split('\n') ?? [];
	}

	public get message(): string | null {
		return Array.isArray(this.rumour.message.contents) && this.rumour.message.contents.length > 0
			? this.rumour.message.contents[0]
			: null;
	}

	public get messageImageNames(): string[] {
		if (!this.message) {
			return [];
		}

		const imageRegex = /\[\[([^\]]+)\]\]/g;
		const matches = Array.from(this.message.matchAll(imageRegex));
		return matches.map(match => match[1].trim()).filter(name => name);
	}

	public get messageLines(): string[] {
		if (!this.message) {
			return [];
		}

		const imageRegex = /\[\[[^\]]+\]\]/g;
		const cleaned = this.message.replace(imageRegex, '').trimEnd();
		return cleaned.split('\n');
	}

	public get messageImageUrls(): string[] {
		return this.messageImageNames.map(name => `assets/images/rumours-list/rumours/optimized/${encodeURIComponent(name)}`);
	}

	public get hasQuote(): boolean {
		return this.quote !== null && this.quote.trim() !== '';
	}

	public get resolvedAfterText(): string | null {
		if (!this.rumour.resolvedDate || !this.rumour.date) {
			return null;
		}

		const created = new Date(this.rumour.date);
		const resolved = new Date(this.rumour.resolvedDate);
		if (Number.isNaN(created.getTime()) || Number.isNaN(resolved.getTime())) {
			return null;
		}

		const diffMs = resolved.getTime() - created.getTime();
		const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
		return `Resolved after ${diffDays} day${diffDays === 1 ? '' : 's'}`;
	}

	private formatDate(value: string): string {
		const date = new Date(value);
		if (Number.isNaN(date.getTime())) {
			return value || 'Unknown date';
		}
		return date.toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}
}
