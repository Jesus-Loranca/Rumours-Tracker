import { Component } from '@angular/core';
import rumoursListData from '../../../@data/rumours-list.json';
import { RumoursListIndexService, RumourListEntry, RumoursListGameGroup } from '../services/rumours-list-index.service';

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
		'underworlds.png',
		'warcry.png',
		'warhammer-quest.png'
	];

	constructor(private readonly rumoursListIndexService: RumoursListIndexService) {
		this.groupedRumoursByGame = this.rumoursListIndexService.createGroupedRumoursByGame(this.rumours);
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
