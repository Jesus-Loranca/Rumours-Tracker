import { Component } from '@angular/core';
import { RumoursListIndexService } from '../services/rumours-list-index.service';
import type { TextObject } from '../../../@types/RumoursIndex';

@Component({
	selector: 'app-rumours-index',
	standalone: false,
	templateUrl: './rumours-index.component.html',
	styleUrls: ['./rumours-index.component.scss']
})
export class RumoursIndexComponent {
	public rumoursIndex = this.rumoursListIndexService.getRumoursIndexEntries();
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

	public getEntries(value: unknown): Array<{ key: string; value: TextObject | TextObject[] }> {
		return this.rumoursListIndexService.getEntries(value);
	}
}
