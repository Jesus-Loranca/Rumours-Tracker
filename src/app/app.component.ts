import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'root',
  templateUrl: './app.component.html'
})

export class AppComponent {
	showScrollBtn: boolean = false;

	scrollToTop(): void {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	}

	@HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showScrollBtn = window.scrollY > 500;
  }
}
