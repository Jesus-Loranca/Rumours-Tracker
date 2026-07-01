import { Component } from '@angular/core';
import rumoursListData from '../../../@data/rumours-list.json';
import { RumoursListIndexService, type RumourListEntry } from '../services/rumours-list-index.service';
import type { TextObject } from '../../../@types/RumoursIndex';

@Component({
	selector: 'app-rumours-index',
	standalone: false,
	templateUrl: './rumours-index.component.html',
	styleUrls: ['./rumours-index.component.scss']
})
export class RumoursIndexComponent {
	public rumours: RumourListEntry[] = Array.isArray(rumoursListData)
		? rumoursListData as RumourListEntry[]
		: Object.values(rumoursListData as Record<string, RumourListEntry>);

	public rumoursIndex = this.rumoursListIndexService.getRumoursIndexEntries();
	public rumoursIndexCounts = this.rumoursListIndexService.getRumourCountsByIndexLabel(this.rumours);
	public expandedSections = new Set<string>();
	public isIndexOpen = false;

	constructor(private readonly rumoursListIndexService: RumoursListIndexService) {}

	public isArray(value: unknown): value is unknown[] {
		return Array.isArray(value);
	}

	public isTextObject(value: unknown): value is TextObject {
		return (
			typeof value === 'object' &&
			value !== null &&
			'text' in value &&
			typeof (value as any).text === 'string'
		);
	}

	public getSectionId(category: string, section: string): string {
		return `${category}::${section}`;
	}

	public slugify(value: string): string {
		return this.rumoursListIndexService.slugify(value);
	}

	public toggleSection(category: string, section: string): void {
		const id = this.getSectionId(category, section);
		if (this.expandedSections.has(id)) {
			this.expandedSections.delete(id);
			return;
		}
		this.expandedSections.add(id);
	}

	public toggleIndex(): void {
		this.isIndexOpen = !this.isIndexOpen;
	}

	public isExpanded(category: string, section: string): boolean {
		return this.expandedSections.has(this.getSectionId(category, section));
	}

	public getRumourCount(label: string): number {
		return this.rumoursIndexCounts.get(this.slugify(label)) ?? 0;
	}

	public getSectionCount(value: unknown): number {
		if (Array.isArray(value)) {
			return value.reduce((count, item) => count + this.getRumourCount(item.text), 0);
		}

		if (typeof value === 'object' && value !== null) {
			return Object.entries(value as Record<string, unknown>).reduce((count, [sectionKey, sectionValue]) => {
				if (Array.isArray(sectionValue)) {
					return count + sectionValue.reduce((innerCount, item) => innerCount + this.getRumourCount(item.text), 0);
				}

				if (this.isTextObject(sectionValue)) {
					return count + this.getRumourCount(sectionKey);
				}

				return count;
			}, 0);
		}

		return 0;
	}

	public hasVisibleEntries(value: unknown): boolean {
		if (Array.isArray(value)) {
			return value.some(item => this.getRumourCount(item.text) > 0);
		}

		if (typeof value !== 'object' || value === null) {
			return false;
		}

		for (const [sectionKey, sectionValue] of Object.entries(value as Record<string, TextObject | TextObject[]>)) {
			if (Array.isArray(sectionValue)) {
				if (sectionValue.some(item => this.getRumourCount(item.text) > 0)) {
					return true;
				}
				continue;
			}

			if (this.getRumourCount(sectionKey) > 0) {
				return true;
			}
		}

		return false;
	}

	public getEntries(value: unknown): Array<{ key: string; value: TextObject | TextObject[] }> {
		return this.rumoursListIndexService.getEntries(value);
	}
}
