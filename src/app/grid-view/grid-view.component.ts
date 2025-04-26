import { Component, Input } from '@angular/core';
import { RumourEngine } from 'src/@types/RumourEngine';

@Component({
  selector: 'grid-view',
  templateUrl: './grid-view.component.html'
})

export class GridViewComponent {
	@Input() rumourEngines!: Array<RumourEngine>;

	getDetailedDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	}

	getUnresolvedDate(createdString: string): string {
    const createdDate = new Date(createdString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdDate.getTime();

    return String(Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) - 1);
}

	handleImageError(event: Event, fallbackImageUrl: string): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '../assets/images/optimized/' + fallbackImageUrl;
  }
}
