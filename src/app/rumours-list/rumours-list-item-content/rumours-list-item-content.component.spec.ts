import { RumoursListItemContentComponent } from './rumours-list-item-content.component';

describe('RumoursListItemContentComponent', () => {
	it('formats bold markdown segments into HTML strong tags', () => {
		const component = new RumoursListItemContentComponent({
			getRumourMongerScore: () => null,
			getRumourMongerPendingCount: () => 0
		} as any);

		const result = component.formatTextForDisplay('This has **bold** text');

		expect(result).toContain('<strong>bold</strong>');
		expect(result).toContain('This has ');
	});
});
