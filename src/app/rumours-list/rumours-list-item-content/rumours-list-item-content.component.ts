import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { RumourListEntry } from '../services/rumours-list-index.service';
import { ScoreService, type RumourMongerScoreSummary } from '../services/score.service';
import { RUMOURMONGER_PROFILES } from '../services/rumourmonger-profiles';

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

	public scoreSummary: RumourMongerScoreSummary | null = null;
	public pendingRumoursCount = 0;

	constructor(private readonly scoreService: ScoreService) {}

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

	public ngOnChanges(): void {
		if (this.rumour?.rumourmonger) {
			this.scoreSummary = this.scoreService.getRumourMongerScore(this.rumour.rumourmonger);
			this.pendingRumoursCount = this.scoreService.getRumourMongerPendingCount(this.rumour.rumourmonger);
		} else {
			this.scoreSummary = null;
			this.pendingRumoursCount = 0;
		}
	}

	public get totalMessages(): number {
		return Array.isArray(this.rumour?.message?.contents) ? this.rumour.message.contents.length : 0;
	}

	public get rumourDate(): string {
		return this.formatDate(this.rumour.date);
	}

	public get wrongRumourReason(): string | null {
		const reason = this.rumour?.wrongRumourReason?.trim();
		return reason || null;
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

	public get rumourmongerProfileUrl(): string | null {
		if (!this.rumour?.rumourmonger) {
			return null;
		}
		return RUMOURMONGER_PROFILES[this.rumour.rumourmonger] || null;
	}

	public get scoreColorClass(): string {
		if (!this.scoreSummary) {
			return '';
		}

		const percent = this.scoreSummary.percent;
		if (percent < 20) {
			return 'score-value--danger';
		}
		if (percent < 40) {
			return 'score-value--warning';
		}
		if (percent < 60) {
			return 'score-value--caution';
		}
		if (percent < 80) {
			return 'score-value--good';
		}

		return 'score-value--great';
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

	private readonly imageMarkerRegex = /\[\[([^\]]+)\]\]/g;
	private readonly imageMarkerRemovalRegex = /\[\[[^\]]+\]\]/g;

	public get quoteLines(): string[] {
		if (!this.currentQuote) {
			return [];
		}

		const cleaned = this.currentQuote.replace(this.imageMarkerRemovalRegex, '').trimEnd();
		if (cleaned === '') {
			return [];
		}

		return cleaned.split('\n').map(line => line.trim()).filter(line => line !== '');
	}

	public get quoteImageNames(): string[] {
		return this.extractImageNames(this.currentQuote);
	}

	public get quoteImageUrls(): string[] {
		return this.quoteImageNames.map(name => `assets/images/rumours-list/rumours/optimized/${encodeURIComponent(name)}`);
	}

	public get messageImageNames(): string[] {
		return this.extractImageNames(this.currentMessage);
	}

	public get messageLines(): string[] {
		if (!this.currentMessage) {
			return [];
		}

		const cleaned = this.currentMessage.replace(this.imageMarkerRemovalRegex, '').trimEnd();
		return cleaned === '' ? [] : cleaned.split('\n');
	}

	private extractImageNames(value: string | null | undefined): string[] {
		if (!value) {
			return [];
		}

		const results: string[] = [];
		const regex = new RegExp(this.imageMarkerRegex);
		let match: RegExpExecArray | null;

		while ((match = regex.exec(value)) !== null) {
			results.push(match[1].trim());
		}

		return results.filter(name => name);
	}

	public formatTextForDisplay(value: string | null | undefined): string {
		if (!value) {
			return '';
		}

		return value.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
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
