export type TextObject = { text: string; edition?: number };

export interface AgeOfSigmarSection {
  'New Edition': TextObject;
  'End of Edition Campaign': TextObject;
  Battletomes: TextObject[];
  'Season of War Series': TextObject;
  'Weird things are happening': TextObject;
}

export interface WarhammerQuestSection {
  Darkwater: TextObject;
}

export interface RumoursListIndexSchema {
  'Age of Sigmar': AgeOfSigmarSection;
  Warcry: string;
  'Warhammer Underworlds': string;
  Spearhead: string;
  'Warhammer Quest': WarhammerQuestSection;
  'Rumourmongers Track Record': string;
}
