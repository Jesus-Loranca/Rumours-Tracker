import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RumourEngine } from 'src/@types/RumourEngine';
import { DateService } from '../services/date.service';

@Component({
  selector: 'grid-view',
  templateUrl: './grid-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GridViewComponent {
	@Input() rumourEngines!: Array<RumourEngine>;

	constructor(private dateService: DateService) {}

	getDetailedDate(dateString: string): string {
		return this.dateService.getDetailedDate(dateString);
	}

	getUnresolvedDate(createdString: string): number {
		return this.dateService.getUnresolvedDate(createdString);
	}

	trackByRumourEngine(index: number, item: RumourEngine): string {
		return item.link || index.toString();
	}

	handleImageError(event: Event, fallbackImageUrl: string): void {
		const imgElement = event.target as HTMLImageElement;
		imgElement.src = '../assets/images/optimized/' + fallbackImageUrl;
	}
}
