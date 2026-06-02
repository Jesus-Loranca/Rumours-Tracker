import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

const pageTitles = {
	rumourEngines: 'Rumour Engines',
	rumoursList: 'Rumours List'
};

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})

export class AppComponent implements OnDestroy {
	sectionTitle = pageTitles.rumourEngines;
	private routerSubscription: Subscription;

	constructor(private router: Router) {
		this.updateSectionTitle(this.router.url);
		this.routerSubscription = this.router.events.pipe(
			filter((event): event is NavigationEnd => event instanceof NavigationEnd)
		).subscribe(({ urlAfterRedirects }) => {
			this.updateSectionTitle(urlAfterRedirects);
		});
	}

	ngOnDestroy(): void {
		this.routerSubscription.unsubscribe();
	}

	onRumourEnginesEvent() {
		this.sectionTitle = pageTitles.rumourEngines;
	}

	onRumoursListEvent() {
		this.sectionTitle = pageTitles.rumoursList;
	}

	private updateSectionTitle(url: string) {
		const cleanUrl = url.split('?')[0].split('#')[0];
		const route = cleanUrl.split('/').filter(Boolean)[0] ?? '';

		switch (route) {
			case 'rumours-list':
				this.sectionTitle = pageTitles.rumoursList;
				break;
			default:
				this.sectionTitle = pageTitles.rumourEngines;
		}
	}
}
