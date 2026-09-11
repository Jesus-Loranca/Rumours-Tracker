import { Injectable } from '@angular/core';
import rumoursListIndex from '../../../@data/rumours-list-index.json';
import type { RumoursListIndexSchema, TextObject } from '../../../@types/RumoursIndex';

export interface RumourListEntry {
	game: string;
	edition: number;
	category: string;
	text: string;
	message: {
		contents: string[];
		quotes: string[];
		images: string[];
		isReaction: boolean;
	};
	isLike: boolean;
	isThanks: boolean;
	isLoveIt: boolean;
	isSadFace: boolean;
	isConfusedFace: boolean;
	isLaughFace: boolean;
	source: string[];
	rumourmonger: string;
	date: string;
	resolvedDate: string;
	legitRumour: boolean;
	wrongRumourReason?: string;
}

export interface RumourCategoryGroup {
	game: string;
	section: string | null;
	label: string;
	id: string;
	rumours: RumourListEntry[];
}

export interface RumourSection {
	section: string | null;
	sectionId: string;
	categories: RumourCategoryGroup[];
}

export interface RumoursListGameGroup {
	game: string;
	sections: RumourSection[];
}

@Injectable({
	providedIn: 'root'
})
export class RumoursListIndexService {
	private indexData = rumoursListIndex as unknown as RumoursListIndexSchema;

	public getRumoursIndex(): RumoursListIndexSchema {
		return this.indexData;
	}

	public getRumoursIndexEntries(): Array<[keyof RumoursListIndexSchema, RumoursListIndexSchema[keyof RumoursListIndexSchema]]> {
		return Object.entries(this.indexData) as Array<[keyof RumoursListIndexSchema, RumoursListIndexSchema[keyof RumoursListIndexSchema]]>;
	}

	public getEntries(value: unknown): Array<{ key: string; value: TextObject | TextObject[] }> {
		if (typeof value !== 'object' || value === null) {
			return [];
		}
		return Object.entries(value as Record<string, TextObject | TextObject[]>).map(([key, val]) => ({ key, value: val }));
	}

	public filterRumours(rumours: RumourListEntry[], includeResolved = false, onlyRecent = false, legitRumourFilter = false, wrongRumourFilter = false): RumourListEntry[] {
		const now = new Date();

		return rumours.filter(rumour => {
			const hasResolvedDate = !!(rumour.resolvedDate && rumour.resolvedDate.trim() !== '');
			const shouldInclude = includeResolved ? hasResolvedDate : !hasResolvedDate;
			if (!shouldInclude) {
				return false;
			}

			if (legitRumourFilter && !rumour.legitRumour) {
				return false;
			}
			if (wrongRumourFilter && rumour.legitRumour) {
				return false;
			}

			if (!onlyRecent) {
				return true;
			}

			const rumourDate = new Date(rumour.date);
			const diffMs = now.getTime() - rumourDate.getTime();
			const diffDays = diffMs / (1000 * 60 * 60 * 24);

			return !Number.isNaN(diffDays) && diffDays <= 31;
		});
	}

	public getRumourCountsByIndexLabel(rumours: RumourListEntry[], includeResolved = false, onlyRecent = false, legitRumourFilter = false, wrongRumourFilter = false): Map<string, number> {
		const counts = new Map<string, number>();
		const lookup = new Map<string, string>();
		const gameFallback = new Map<string, string>();

		for (const [game, value] of Object.entries(this.indexData)) {
			if (typeof value === 'string') {
				const label = value || game;
				const slug = this.slugify(label);
				lookup.set(slug, slug);
				gameFallback.set(game, slug);
				counts.set(slug, 0);
				continue;
			}

			for (const [section, sectionValue] of Object.entries(value as Record<string, TextObject | TextObject[]>)) {
				if (Array.isArray(sectionValue)) {
					for (const item of sectionValue) {
						const slug = this.slugify(item.text);
						if (lookup.has(slug)) {
							continue;
						}
						lookup.set(slug, slug);
						counts.set(slug, 0);
					}
					continue;
				}

				if (this.isTextObject(sectionValue)) {
					const slug = this.slugify(section);
					if (lookup.has(slug)) {
						continue;
					}
					lookup.set(slug, slug);
					counts.set(slug, 0);
				}
			}
		}

		for (const rumour of this.filterRumours(rumours, includeResolved, onlyRecent, legitRumourFilter, wrongRumourFilter)) {
			const lookupValue = (rumour.category || '').trim();
			const key = this.slugify(lookupValue);
			let target = lookup.get(key);
			if (target === undefined && rumour.category.trim() === '') {
				target = gameFallback.get(rumour.game);
			}
			if (target === undefined) {
				continue;
			}

			counts.set(target, (counts.get(target) ?? 0) + 1);
		}

		return counts;
	}

	public slugify(value: string): string {
		return value
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');
	}

	public createGroupedRumoursByGame(rumours: RumourListEntry[], includeResolved = false, onlyRecent = false, legitRumourFilter = true, wrongRumourFilter = true): RumoursListGameGroup[] {
		const groups: RumourCategoryGroup[] = [];
		const lookup = new Map<string, number>();
		const gameFallback = new Map<string, number>();

		for (const [game, value] of Object.entries(this.indexData)) {
			if (typeof value === 'string') {
				const label = value || game;
				const id = this.slugify(label);
				const lookupKey = this.slugify(label);
				lookup.set(lookupKey, groups.length);
				groups.push({ game, section: null, label, id, rumours: [] });
				gameFallback.set(game, groups.length - 1);
				continue;
			}

			for (const [section, sectionValue] of Object.entries(value as Record<string, TextObject | TextObject[]>)) {
				if (Array.isArray(sectionValue)) {
					for (const item of sectionValue) {
						const label = item.text;
						const lookupKey = this.slugify(label);
						if (lookup.has(lookupKey)) {
							continue;
						}
						const id = this.slugify(label);
						lookup.set(lookupKey, groups.length);
						groups.push({ game, section, label, id, rumours: [] });
					}
					continue;
				}

				if (this.isTextObject(sectionValue)) {
					const label = section;
					const lookupKey = this.slugify(label);
					if (lookup.has(lookupKey)) {
						continue;
					}
					const id = this.slugify(label);
					lookup.set(lookupKey, groups.length);
					groups.push({ game, section, label, id, rumours: [] });
				}
			}
		}

		for (const rumour of this.filterRumours(rumours, includeResolved, onlyRecent, legitRumourFilter, wrongRumourFilter)) {
			const lookupValue = (rumour.category || '').trim();
			const key = this.slugify(lookupValue);
			let index = lookup.get(key);
			if (index === undefined && rumour.category.trim() === '') {
				index = gameFallback.get(rumour.game);
			}
			if (index === undefined) {
				continue;
			}
			groups[index].rumours.push(rumour);
		}

		const groupedByGame: RumoursListGameGroup[] = [];
		for (const categoryGroup of groups) {
			if (!categoryGroup.rumours.length) {
				continue;
			}

			let gameGroup = groupedByGame.find(g => g.game === categoryGroup.game);
			if (!gameGroup) {
				gameGroup = { game: categoryGroup.game, sections: [] };
				groupedByGame.push(gameGroup);
			}

			let sectionGroup = gameGroup.sections.find(s => s.section === categoryGroup.section);
			if (!sectionGroup) {
				sectionGroup = {
					section: categoryGroup.section,
					sectionId: this.slugify(categoryGroup.section ?? categoryGroup.label),
					categories: []
				};
				gameGroup.sections.push(sectionGroup);
			}

			sectionGroup.categories.push(categoryGroup);
		}

		return groupedByGame;
	}

	private isTextObject(value: unknown): value is TextObject {
		return (
			typeof value === 'object' &&
			value !== null &&
			'text' in value &&
			typeof (value as any).text === 'string'
		);
	}
}
