import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'back-to-top',
  templateUrl: './back-to-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackToTopComponent {
	showScrollBtn: boolean = false;

	@HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showScrollBtn = window.scrollY > 500;
  }

	scrollToBottom(): void {
		window.scroll({
			top: document.body.scrollHeight,
			left: 0,
			behavior: 'smooth'
		});
	}

	scrollToTop(): void {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	}
}
