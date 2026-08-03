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

	public currentIndex = 0;

	public openUrl(): void {
		const url = this.currentSourceUrl;
		if (!url) {
			return;
		}
		window.open(url, '_blank', 'noopener,noreferrer');
	}

	public closeDialog(): void {
		this.currentIndex = 0;
		this.close.emit();
	}

	public get totalMessages(): number {
		return Array.isArray(this.rumour?.message?.contents) ? this.rumour.message.contents.length : 0;
	}

	public get rumourDate(): string {
		return this.formatDate(this.rumour.date);
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

	public get currentMessage(): string | null {
		return Array.isArray(this.rumour.message?.contents) && this.rumour.message.contents.length > 0
			? this.rumour.message.contents[this.currentIndex] ?? null
			: null;
	}

	public get currentQuote(): string | null {
		return Array.isArray(this.rumour.message?.quotes) && this.rumour.message.quotes.length > 0
			? this.rumour.message.quotes[this.currentIndex] ?? this.rumour.message.quotes[0]
			: null;
	}

	public get currentSourceUrl(): string | null {
		return Array.isArray(this.rumour.source) && this.rumour.source.length > 0
			? this.rumour.source[this.currentIndex] ?? this.rumour.source[0]
			: null;
	}

	public nextMessage(): void {
		if (this.currentIndex < this.totalMessages - 1) {
			this.currentIndex += 1;
		}
	}

	public prevMessage(): void {
		if (this.currentIndex > 0) {
			this.currentIndex -= 1;
		}
	}

	public get quoteLines(): string[] {
		return this.currentQuote?.split('\n') ?? [];
	}

	public get messageImageNames(): string[] {
		if (!this.currentMessage) {
			return [];
		}

		const imageRegex = /\[\[([^\]]+)\]\]/g;
		const matches = Array.from(this.currentMessage.matchAll(imageRegex));
		return matches.map(match => match[1].trim()).filter(name => name);
	}

	public get messageLines(): string[] {
		if (!this.currentMessage) {
			return [];
		}

		const imageRegex = /\[\[[^\]]+\]\]/g;
		const cleaned = this.currentMessage.replace(imageRegex, '').trimEnd();
		return cleaned.split('\n');
	}

	public get messageImageUrls(): string[] {
		return this.messageImageNames.map(name => `assets/images/rumours-list/rumours/optimized/${encodeURIComponent(name)}`);
	}

	public get hasQuote(): boolean {
		return this.currentQuote !== null && this.currentQuote.trim() !== '';
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
