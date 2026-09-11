import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import rumoursListData from '../../@data/rumours-list.json';
import type { RumourListEntry } from './services/rumours-list-index.service';

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
  public selectedRumourmonger = '';
  public rumourmongers = this.getRumourmongers();
  public rumourmongerMenuOpen = false;

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

  public toggleRumourmongerMenu(): void {
    this.rumourmongerMenuOpen = !this.rumourmongerMenuOpen;
  }

  public selectRumourmonger(rumourmonger: string): void {
    this.selectedRumourmonger = rumourmonger;
    this.rumourmongerMenuOpen = false;
  }

  public getRumourmongerLabel(rumourmonger: string): string {
    const maxVisibleCharacters = 11;
    return rumourmonger.length > maxVisibleCharacters
      ? `${rumourmonger.slice(0, maxVisibleCharacters).trimEnd()}...`
      : rumourmonger;
  }

  private getRumourmongers(): string[] {
    const rumours = Array.isArray(rumoursListData)
      ? rumoursListData as RumourListEntry[]
      : Object.values(rumoursListData as Record<string, RumourListEntry>);

    return Array.from(new Set(rumours
      .map(rumour => rumour.rumourmonger?.trim())
      .filter((rumourmonger): rumourmonger is string => !!rumourmonger))).sort((first, second) =>
        first.localeCompare(second)
      );
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
