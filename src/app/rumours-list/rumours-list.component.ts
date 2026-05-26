import { Component } from '@angular/core';
import * as rumoursListData from '../../@data/rumours-list.json';

interface RumourListEntry {
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

@Component({
  selector: 'app-rumours-list',
  standalone: false,
  templateUrl: './rumours-list.component.html'
})
export class RumoursListComponent {
  rumours: RumourListEntry[] = (rumoursListData as unknown as RumourListEntry[]);

  get firstQuote(): (rumour: RumourListEntry) => string {
    return (rumour: RumourListEntry) => rumour.message?.[0]?.quotes?.[0] ?? 'Sin extracto disponible';
  }

  get firstSource(): (rumour: RumourListEntry) => string {
    return (rumour: RumourListEntry) => rumour.source?.[0] ?? 'Fuente no indicada';
  }
}
