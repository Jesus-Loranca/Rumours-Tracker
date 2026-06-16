import { Component } from '@angular/core';
import rumoursListIndex from '../../../@data/rumours-list-index.json';
import type { RumoursListIndexSchema, TextObject } from '../../../@types/RumoursIndex';

@Component({
	selector: 'app-rumours-index',
	standalone: false,
	templateUrl: './rumours-index.component.html',
	styleUrls: ['./rumours-index.component.scss']
})
export class RumoursIndexComponent {
	public rumoursIndexData = rumoursListIndex as unknown as RumoursListIndexSchema;
	public rumoursIndex = Object.entries(this.rumoursIndexData) as Array<[
		keyof RumoursListIndexSchema,
		RumoursListIndexSchema[keyof RumoursListIndexSchema]
	]>;
	public expandedSections = new Set<string>();
		public isIndexOpen = false;
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
		return value
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');
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

	public getEntries(value: unknown): Array<{ key: string; value: TextObject | TextObject[] }> {
		if (typeof value !== 'object' || value === null) {
			return [];
		}
		return Object.entries(value as Record<string, TextObject | TextObject[]>).map(([key, val]) => ({ key, value: val }));
	}
}
