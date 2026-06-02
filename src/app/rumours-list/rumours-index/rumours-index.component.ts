import { Component } from '@angular/core';
import rumoursListIndex from '../../../@data/rumours-list-index.json';
import type { RumoursListIndexSchema, TextObject } from '../../../@types/RumoursIndex';

@Component({
  selector: 'app-rumours-index',
  standalone: false,
  templateUrl: './rumours-index.component.html'
})
export class RumoursIndexComponent {
  public rumoursIndexData = rumoursListIndex as unknown as RumoursListIndexSchema;
  public rumoursIndex = Object.entries(this.rumoursIndexData) as Array<[
    keyof RumoursListIndexSchema,
    RumoursListIndexSchema[keyof RumoursListIndexSchema]
  ]>;

  public isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
  }

  public isTextObject(value: unknown): value is TextObject {
    return (
      typeof value === 'object' &&
      value !== null &&
      'text' in value &&
      typeof (value as any).text === 'string'
    );
  }

  public getEntries(value: unknown): Array<{ key: string; value: TextObject | TextObject[] }> {
    if (typeof value !== 'object' || value === null) {
      return [];
    }
    return Object.entries(value as Record<string, TextObject | TextObject[]>).map(([key, val]) => ({ key, value: val }));
  }
}
