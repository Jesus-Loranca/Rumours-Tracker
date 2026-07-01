import { Component, input } from '@angular/core';

@Component({
  selector: 'section-title',
  templateUrl: './section-title.component.html',
  standalone: true
})
export class SectionTitleComponent {
  title = input<string>('');
}
