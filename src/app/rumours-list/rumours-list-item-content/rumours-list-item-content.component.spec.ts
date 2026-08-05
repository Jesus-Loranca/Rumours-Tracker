import { RumoursListItemContentComponent } from './rumours-list-item-content.component';

describe('RumoursListItemContentComponent', () => {
	const component = new RumoursListItemContentComponent({
		getRumourMongerScore: () => null,
		getRumourMongerPendingCount: () => 0
	} as any);

	it('formats bold markdown segments into HTML strong tags', () => {
		const result = component.formatTextForDisplay('This has **bold** text');

		expect(result).toContain('<strong>bold</strong>');
		expect(result).toContain('This has ');
	});

	it('extracts image names from quote content', () => {
		component.rumour = {
			message: {
				quotes: ['Check this out\n[[image-2026-06-09_1.jpg]]\nMore text']
			}
		} as any;

		expect(component.quoteImageNames).toEqual(['image-2026-06-09_1.jpg']);
	});

	it('returns quote lines without image markers', () => {
		component.rumour = {
			message: {
				quotes: ['Hello\n[[image-2026-06-09_1.jpg]]\nWorld']
			}
		} as any;

		expect(component.quoteLines).toEqual(['Hello', 'World']);
	});

	it('handles quote content that contains only image markers', () => {
		component.rumour = {
			message: {
				quotes: ['[[image-2026-06-09_1.jpg]]']
			}
		} as any;

		expect(component.quoteLines).toEqual([]);
		expect(component.quoteImageNames).toEqual(['image-2026-06-09_1.jpg']);
	});
});
