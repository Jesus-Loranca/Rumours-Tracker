import { Component } from '@angular/core';
import * as rumoursListData from '../../../@data/rumours-list.json';

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
  selector: 'app-rumours-list-items',
  standalone: false,
  templateUrl: './rumours-list-items.component.html'
})
export class RumoursListItemsComponent {
  public rumours: RumourListEntry[] = rumoursListData as RumourListEntry[];
}
