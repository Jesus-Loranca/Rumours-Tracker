import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'back-to-top',
  templateUrl: './back-to-top.component.html'
})
export class BackToTopComponent {
	showScrollBtn: boolean = false;

	@HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showScrollBtn = window.scrollY > 500;
  }

	scrollToTop(): void {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	}
}
