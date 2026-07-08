import { RumoursListIndexService } from './rumours-list-index.service';
import rumoursListData from '../../../@data/rumours-list.json';

describe('RumoursListIndexService', () => {
  let service: RumoursListIndexService;

  beforeEach(() => {
    service = new RumoursListIndexService();
  });

  it('filters pending rumours by default and resolved rumours when requested', () => {
    const rumours = Array.isArray(rumoursListData)
      ? rumoursListData as Array<Record<string, unknown>>
      : Object.values(rumoursListData as Record<string, Record<string, unknown>>);

    const pendingRumours = service.filterRumours(rumours as any[], false);
    const resolvedRumours = service.filterRumours(rumours as any[], true);

    expect(pendingRumours.every(rumour => !rumour.resolvedDate)).toBeTrue();
    expect(resolvedRumours.every(rumour => !!rumour.resolvedDate)).toBeTrue();
  });

  it('builds index counts from the currently selected view', () => {
    const rumours = Array.isArray(rumoursListData)
      ? rumoursListData as Array<Record<string, unknown>>
      : Object.values(rumoursListData as Record<string, Record<string, unknown>>);

    const counts = service.getRumourCountsByIndexLabel(rumours as any[], true);

    expect([...counts.values()].some(value => value > 0)).toBeTrue();
  });
});
