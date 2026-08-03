import { Injectable } from '@angular/core';
import rumoursListData from '../../../@data/rumours-list.json';
import type { RumourListEntry } from './rumours-list-index.service';

export interface RumourMongerScoreSummary {
	percent: number;
	legit: number;
	total: number;
	unresolved: number;
}

@Injectable({
	providedIn: 'root'
})
export class ScoreService {
	private readonly rumours: RumourListEntry[] = Array.isArray(rumoursListData)
		? rumoursListData as RumourListEntry[]
		: Object.values(rumoursListData as Record<string, RumourListEntry>);

	public getRumourMongerScore(rumourmonger: string): RumourMongerScoreSummary | null {
		const rumours = this.rumours.filter(rumour => rumour.rumourmonger === rumourmonger);
		const resolvedRumours = rumours.filter(rumour => rumour.resolvedDate && rumour.resolvedDate.trim() !== '');
		const total = resolvedRumours.length;
		if (total === 0) {
			return null;
		}

		const legit = resolvedRumours.filter(rumour => rumour.legitRumour).length;
		const unresolved = rumours.filter(rumour => !rumour.resolvedDate || rumour.resolvedDate.trim() === '').length;
		const percent = Math.round((legit / total) * 100);

		return {
			percent,
			legit,
			total,
			unresolved
		};
	}
}
