import { Component, Input } from '@angular/core';
import rumoursListData from '../../../@data/rumours-list.json';
import { RumoursListIndexService, RumourListEntry, RumoursListGameGroup } from '../services/rumours-list-index.service';

@Component({
	selector: 'app-rumours-list-items',
	standalone: false,
	templateUrl: './rumours-list-items.component.html',
	styleUrl: './rumours-list-items.component.scss'
})
export class RumoursListItemsComponent {
	private _viewMode: 'active' | 'solved' = 'active';
	private _recentOnly = false;

	public rumours: RumourListEntry[] = Array.isArray(rumoursListData)
		? rumoursListData as RumourListEntry[]
		: Object.values(rumoursListData as Record<string, RumourListEntry>);

	public groupedRumoursByGame: RumoursListGameGroup[] = [];

	private readonly categoryLogoFiles = [
		'age-of-sigmar.png',
		'blades-of-khorne.png',
		'cities-of-sigmar.png',
		'daughters-of-khaine.png',
		'disciples-of-tzeentch.png',
		'flesh-eater-courts.png',
		'fyreslayers.png',
		'gloomspite-gitz.png',
		'hedonites-of-slaanesh.png',
		'helmsmiths-of-hashut.png',
		'idoneth-deepkin.png',
		'ironjawz.png',
		'kharadron-overlords.png',
		'kruleboyz.png',
		'lumineth-realm-lords.png',
		'maggotkin-of-nurgle.png',
		'nighthaunt.png',
		'ogor-mawtribes.png',
		'ossiarch-bonereapers.png',
		'seraphon.png',
		'skaven.png',
		'slaves-to-darkness.png',
		'sons-of-behemat.png',
		'soulblight-gravelords.png',
		'spearhead.png',
		'stormcast-eternals.png',
		'sylvaneth.png',
		'ulgurothi.png',
		'warhammer-underworlds.png',
		'warcry.png',
		'warhammer-quest.png'
	];

	constructor(private readonly rumoursListIndexService: RumoursListIndexService) {
		this.applyView();
	}

	@Input()
	set viewMode(value: 'active' | 'solved') {
		this._viewMode = value;
		this.applyView();
	}

	get viewMode(): 'active' | 'solved' {
		return this._viewMode;
	}

	@Input()
	set recentOnly(value: boolean) {
		this._recentOnly = value;
		this.applyView();
	}

	get recentOnly(): boolean {
		return this._recentOnly;
	}

	private applyView(): void {
		this.groupedRumoursByGame = this.rumoursListIndexService.createGroupedRumoursByGame(
			this.rumours,
			this.viewMode === 'solved',
			this.recentOnly
		);
	}

	public getCategoryLogoUrl(label: string): string | null {
		const slug = this.slugify(label);
		const logoFile = this.categoryLogoFiles.find(file => file.startsWith(`${slug}.`));
		return logoFile ? `/assets/images/rumours-list/logos/optimized/${logoFile}` : null;
	}

	public slugify(value: string): string {
		return this.rumoursListIndexService.slugify(value);
	}
}
