import { Component } from '@angular/core';
import rumoursListIndex from '../../../@data/rumours-list-index.json';
import rumoursListData from '../../../@data/rumours-list.json';
import type { RumoursListIndexSchema, TextObject } from '../../../@types/RumoursIndex';

export interface RumourListEntry {
	game: string;
	edition: number;
	category: string;
	text: string;
	groupUnder: string;
	message: Array<{
		contents: string[];
		quotes: string[];
		images: string[];
		isReaction: boolean;
	}>;
	isLike: boolean;
	isThanks: boolean;
	isLoveIt: boolean;
	isSadFace: boolean;
	source: string[];
	rumourmonger: string;
	date: string;
	resolvedDate: string;
	legitRumour: boolean;
}

interface RumourCategoryGroup {
	game: string;
	section: string;
	label: string;
	id: string;
	rumours: RumourListEntry[];
}

interface RumourSection {
	section: string;
	categories: RumourCategoryGroup[];
}

interface RumoursListGameGroup {
	game: string;
	sections: RumourSection[];
}

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
	public groupedRumoursByGame: RumoursListGameGroup[] = this.createGroupedRumoursByGame();

	private getRumoursIndex(): RumoursListIndexSchema {
		return rumoursListIndex as unknown as RumoursListIndexSchema;
	}

	public slugify(value: string): string {
		return value
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');
	}

	private isTextObject(value: unknown): value is TextObject {
		return (
			typeof value === 'object' &&
			value !== null &&
			'text' in value &&
			typeof (value as any).text === 'string'
		);
	}

	private createGroupedRumoursByGame(): RumoursListGameGroup[] {
		const indexData = this.getRumoursIndex();
		const groups: RumourCategoryGroup[] = [];
		const lookup = new Map<string, number>();
		const gameFallback = new Map<string, number>();

		for (const [game, value] of Object.entries(indexData)) {
			if (typeof value === 'string') {
				const label = value || game;
				const id = this.slugify(label);
				lookup.set(label, groups.length);
				groups.push({ game, section: game, label, id, rumours: [] });
				gameFallback.set(game, groups.length - 1);
				continue;
			}

			for (const [section, sectionValue] of Object.entries(value as Record<string, TextObject | TextObject[]>)) {
				if (Array.isArray(sectionValue)) {
					for (const item of sectionValue) {
						const label = item.text;
						if (lookup.has(label)) {
							continue;
						}
						const id = this.slugify(label);
						lookup.set(label, groups.length);
						groups.push({ game, section, label, id, rumours: [] });
					}
					continue;
				}

				if (this.isTextObject(sectionValue)) {
					const label = section;
					if (lookup.has(label)) {
						continue;
					}
					const id = this.slugify(label);
					lookup.set(label, groups.length);
					groups.push({ game, section, label, id, rumours: [] });
				}
			}
		}

		for (const rumour of this.rumours) {
			const key = (rumour.category || rumour.groupUnder || '').trim();
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
				sectionGroup = { section: categoryGroup.section, categories: [] };
				gameGroup.sections.push(sectionGroup);
			}

			sectionGroup.categories.push(categoryGroup);
		}

		return groupedByGame;
	}
}
