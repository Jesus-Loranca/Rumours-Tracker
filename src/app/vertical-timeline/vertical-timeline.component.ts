import { Component, HostListener, Input } from '@angular/core';
import { RumourEngine } from 'src/@types/RumourEngine';

@Component({
  selector: 'vertical-timeline',
  templateUrl: './vertical-timeline.component.html'
})

export class VerticalTimelineComponent  {
	@Input() rumourEngines: Array<RumourEngine> = [];

	@HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const rumours = document.querySelectorAll('.bounce');

    rumours.forEach((rumour: Element, index: number) => {
      const distanceToTop = rumour.getBoundingClientRect().top;

      if (index > 1 && (distanceToTop - 150) < window.innerHeight)  {
				rumour.classList.add('bounce-in');
      }
    });
  }

	getDetailedDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	}

	getResolvedDate(createdString: string, resolvedString: string): string {
		const createdDate = new Date(createdString);
		const resolvedDate = new Date(resolvedString);
		const timeDifference = resolvedDate.getTime() - createdDate.getTime();

		return String(Math.ceil(timeDifference / (1000 * 60 * 60 * 24)));
	}

	getUnresolvedDate(createdString: string):string {
		const createdDate = new Date(createdString);
		const currentDate = new Date();
		const timeDifference = currentDate.getTime() - createdDate.getTime();

		return String(Math.ceil(timeDifference / (1000 * 60 * 60 * 24)));
	}

	getYear(dateString: string): number {
		return new Date(dateString).getFullYear();
	}

  handleImageError(event: Event, fallbackImageUrl: string): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '../assets/images/' + fallbackImageUrl;
  }
}
