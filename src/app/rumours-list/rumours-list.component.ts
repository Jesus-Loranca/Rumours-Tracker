import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rumours-list',
  standalone: false,
  templateUrl: './rumours-list.component.html',
  styleUrls: ['./rumours-list.component.scss']
})
export class RumoursListComponent {
  public viewMode: 'active' | 'solved' = 'active';
  public recentOnly = false;
  public showLegitRumours = false;
  public showWrongRumours = false;

  constructor(private readonly route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      const requestedView = params.get('view');
			this.showLegitRumours = false;
			this.showWrongRumours = false;

      if (requestedView === 'solved') {
        this.viewMode = 'solved';
        this.recentOnly = false;
        return;
      }

      this.viewMode = 'active';
    });
  }

  public toggleRecentOnly(): void {
    if (this.viewMode !== 'active') {
      return;
    }
    this.recentOnly = !this.recentOnly;
  }

  public toggleLegitRumours(): void {
		this.showWrongRumours = false;

    if (this.viewMode !== 'solved') {
      return;
    }
    this.showLegitRumours = !this.showLegitRumours;
  }

  public toggleWrongRumours(): void {
		this.showLegitRumours = false;

    if (this.viewMode !== 'solved') {
      return;
    }
    this.showWrongRumours = !this.showWrongRumours;
  }
}
