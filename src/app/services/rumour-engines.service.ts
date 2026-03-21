import { Injectable } from '@angular/core';
import * as rumourEnginesData from '../../@data/rumour-engines.json';
import { RumourEngine } from 'src/@types/RumourEngine';

@Injectable({
  providedIn: 'root'
})
export class RumourEnginesService {
  private rumourEngines: Array<RumourEngine> = [];

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    this.rumourEngines = Object.keys(rumourEnginesData)
      .map(key => rumourEnginesData[Number(key)])
      .filter(value => value !== undefined);
  }

  getAll(): Array<RumourEngine> {
    return [...this.rumourEngines];
  }

  getUniqueYears(): Array<string> {
    return Array.from(new Set(this.rumourEngines.map(rumourEngine => String(new Date(rumourEngine.date).getFullYear()))));
  }

  getUniqueTags(): Array<string> {
    return Array.from(new Set(this.rumourEngines.flatMap(rumourEngine => rumourEngine.tags))).sort();
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
