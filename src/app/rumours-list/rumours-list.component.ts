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

  constructor(private readonly route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      const requestedView = params.get('view');
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
}
