import { Injectable } from '@angular/core';
import rumoursListIndex from '../../../@data/rumours-list-index.json';
import type { RumoursListIndexSchema, TextObject } from '../../../@types/RumoursIndex';

export interface RumourListEntry {
  game: string;
  edition: number;
  category: string;
  text: string;
  groupUnder: string;
  message: Array<{
    contents: string[];
    quotes: string[];
    images: string[];
    isReaction: boolean;
  }>;
  isLike: boolean;
  isThanks: boolean;
  isLoveIt: boolean;
  isSadFace: boolean;
  source: string[];
  rumourmonger: string;
  date: string;
  resolvedDate: string;
  legitRumour: boolean;
}

export interface RumourCategoryGroup {
  game: string;
  section: string | null;
  label: string;
  id: string;
  rumours: RumourListEntry[];
}

export interface RumourSection {
  section: string | null;
  sectionId: string;
  categories: RumourCategoryGroup[];
}

export interface RumoursListGameGroup {
  game: string;
  sections: RumourSection[];
}

@Injectable({
  providedIn: 'root'
})
export class RumoursListIndexService {
  private indexData = rumoursListIndex as unknown as RumoursListIndexSchema;

  public getRumoursIndex(): RumoursListIndexSchema {
    return this.indexData;
  }

  public getRumoursIndexEntries(): Array<[keyof RumoursListIndexSchema, RumoursListIndexSchema[keyof RumoursListIndexSchema]]> {
    return Object.entries(this.indexData) as Array<[keyof RumoursListIndexSchema, RumoursListIndexSchema[keyof RumoursListIndexSchema]]>;
  }

  public getEntries(value: unknown): Array<{ key: string; value: TextObject | TextObject[] }> {
    if (typeof value !== 'object' || value === null) {
      return [];
    }
    return Object.entries(value as Record<string, TextObject | TextObject[]>).map(([key, val]) => ({ key, value: val }));
  }

  public slugify(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  public createGroupedRumoursByGame(rumours: RumourListEntry[]): RumoursListGameGroup[] {
    const groups: RumourCategoryGroup[] = [];
    const lookup = new Map<string, number>();
    const gameFallback = new Map<string, number>();

    for (const [game, value] of Object.entries(this.indexData)) {
      if (typeof value === 'string') {
        const label = value || game;
        const id = this.slugify(label);
        const lookupKey = this.slugify(label);
        lookup.set(lookupKey, groups.length);
        groups.push({ game, section: null, label, id, rumours: [] });
        gameFallback.set(game, groups.length - 1);
        continue;
      }

      for (const [section, sectionValue] of Object.entries(value as Record<string, TextObject | TextObject[]>)) {
        if (Array.isArray(sectionValue)) {
          for (const item of sectionValue) {
            const label = item.text;
            const lookupKey = this.slugify(label);
            if (lookup.has(lookupKey)) {
              continue;
            }
            const id = this.slugify(label);
            lookup.set(lookupKey, groups.length);
            groups.push({ game, section, label, id, rumours: [] });
          }
          continue;
        }

        if (this.isTextObject(sectionValue)) {
          const label = section;
          const lookupKey = this.slugify(label);
          if (lookup.has(lookupKey)) {
            continue;
          }
          const id = this.slugify(label);
          lookup.set(lookupKey, groups.length);
          groups.push({ game, section, label, id, rumours: [] });
        }
      }
    }

    for (const rumour of rumours) {
      if (rumour.resolvedDate && rumour.resolvedDate.trim() !== '') {
        continue;
      }

      const lookupValue = (rumour.category || rumour.groupUnder || '').trim();
      const key = this.slugify(lookupValue);
      let index = lookup.get(key);
      if (index === undefined && rumour.category.trim() === '') {
        index = gameFallback.get(rumour.game);
      }
      if (index === undefined) {
        continue;
      }
      groups[index].rumours.push(rumour);
    }

    const groupedByGame: RumoursListGameGroup[] = [];
    for (const categoryGroup of groups) {
      if (!categoryGroup.rumours.length) {
        continue;
      }

      let gameGroup = groupedByGame.find(g => g.game === categoryGroup.game);
      if (!gameGroup) {
        gameGroup = { game: categoryGroup.game, sections: [] };
        groupedByGame.push(gameGroup);
      }

      let sectionGroup = gameGroup.sections.find(s => s.section === categoryGroup.section);
      if (!sectionGroup) {
        sectionGroup = {
          section: categoryGroup.section,
          sectionId: this.slugify(categoryGroup.section ?? categoryGroup.label),
          categories: []
        };
        gameGroup.sections.push(sectionGroup);
      }

      sectionGroup.categories.push(categoryGroup);
    }

    return groupedByGame;
  }

  private isTextObject(value: unknown): value is TextObject {
    return (
      typeof value === 'object' &&
      value !== null &&
      'text' in value &&
      typeof (value as any).text === 'string'
    );
  }
}
