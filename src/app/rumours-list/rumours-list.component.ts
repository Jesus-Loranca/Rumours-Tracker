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

  constructor(private readonly route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      const requestedView = params.get('view');
      this.viewMode = requestedView === 'solved' ? 'solved' : 'active';
    });
  }
}
