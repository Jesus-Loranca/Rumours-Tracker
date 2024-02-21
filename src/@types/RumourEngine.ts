export interface RumourEngine {
	date: string;
		resolvedDate: string;
		link: string;
		resolvedLink: string;
		resolvedEvent: string;
		rumourEngineImage: {
			url: string;
			cdn: string;
		};
		miniature: {
			name: string;
			link: string;
			image: {
				url: string;
				cdn: string;
			}
		};
		tags: Array<string>;
}
