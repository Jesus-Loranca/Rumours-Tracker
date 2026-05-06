import { Component, HostListener, Input, ChangeDetectionStrategy } from '@angular/core';
import { RumourEngine } from 'src/@types/RumourEngine';
import { DateService } from '../services/date.service';

@Component({
  selector: 'vertical-timeline',
  templateUrl: './vertical-timeline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})

export class VerticalTimelineComponent  {
	@Input() rumourEngines: Array<RumourEngine> = [];

	constructor(private dateService: DateService) {}

	getDetailedDate(dateString: string): string {
		return this.dateService.getDetailedDate(dateString);
	}

	getYear(dateString: string): number {
		return this.dateService.getYear(dateString);
	}

	getUnresolvedDate(createdString: string): number {
		return this.dateService.getUnresolvedDate(createdString);
	}

	getResolvedDate(createdString: string, resolvedString: string): number {
		return this.dateService.getResolvedDate(createdString, resolvedString);
	}

	trackByRumourEngine(index: number, item: RumourEngine): string {
		return item.link || index.toString();
	}

	trackByTag(index: number, tag: string): string {
		return tag;
	}

	handleImageError(event: Event, fallbackImageUrl: string): void {
		const imgElement = event.target as HTMLImageElement;
		imgElement.src = '../assets/images/optimized/' + fallbackImageUrl;
	}

	@HostListener('window:scroll')
	onWindowScroll(): void {
		const rumours = document.querySelectorAll('.bounce');

		rumours.forEach((rumour: Element, index: number) => {
			const distanceToTop = rumour.getBoundingClientRect().top;

			if (index > 1 && (distanceToTop - 150) < window.innerHeight)  {
				rumour.classList.add('bounce-in');
			}
		});
	}
}
