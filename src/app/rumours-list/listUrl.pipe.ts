import { Pipe, PipeTransform } from "@angular/core";
import { RumoursListIndexService } from "./services/rumours-list-index.service";

@Pipe({
  name: 'listUrl',
  standalone: true
})
export class ListUrlPipe implements PipeTransform {
  constructor(private readonly rumoursListIndexService: RumoursListIndexService) {}

  transform(fragment: string, viewMode: 'active' | 'solved' | null): string {
    const slug = this.rumoursListIndexService.slugify(fragment);
    return viewMode === 'solved'
      ? `/rumours-list?view=solved#${slug}`
      : `/rumours-list#${slug}`;
  }
}
