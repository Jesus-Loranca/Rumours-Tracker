import { Injectable, signal, computed } from '@angular/core';
import * as rumourEnginesData from '../../@data/rumour-engines.json';
import { RumourEngine } from 'src/@types/RumourEngine';

@Injectable({
  providedIn: 'root'
})
export class RumourEnginesService {
  private rumourEngines: Array<RumourEngine> = [];
  private rumourEnginesSignal = signal<Array<RumourEngine>>([]);
  private uniqueYearsSignal = computed(() =>
    Array.from(new Set(this.rumourEnginesSignal().map(rumourEngine => String(new Date(rumourEngine.date).getFullYear()))))
  );
  private uniqueTagsSignal = computed(() =>
    Array.from(new Set(this.rumourEnginesSignal().flatMap(rumourEngine => rumourEngine.tags))).sort()
  );

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    this.rumourEngines = Object.keys(rumourEnginesData)
      .map(key => rumourEnginesData[Number(key)])
      .filter(value => value !== undefined);
    this.rumourEnginesSignal.set(this.rumourEngines);
  }

  getAll(): Array<RumourEngine> {
    return [...this.rumourEngines];
  }

  getUniqueYears(): Array<string> {
    return this.uniqueYearsSignal();
  }

  getUniqueTags(): Array<string> {
    return this.uniqueTagsSignal();
  }

  filterByYear(rumourEngines: Array<RumourEngine>, year: string): Array<RumourEngine> {
    return rumourEngines.filter(rumourEngine => rumourEngine.date.includes(year));
  }

  filterByTag(rumourEngines: Array<RumourEngine>, tag: string): Array<RumourEngine> {
    return rumourEngines.filter(rumourEngine => rumourEngine.tags.includes(tag));
  }

  orderBy(rumourEngines: Array<RumourEngine>, order: string): Array<RumourEngine> {
    return [...rumourEngines].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (order === 'newest' || order === 'current') {
        return dateB.getTime() - dateA.getTime();
      }
      return dateA.getTime() - dateB.getTime(); // oldest
    });
  }

  filterUnresolvedOnly(rumourEngines: Array<RumourEngine>): Array<RumourEngine> {
    return rumourEngines.filter(rumourEngine => !rumourEngine.resolvedDate);
  }
}
