import { Component, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class BackToTopComponent {
	showScrollBtn: boolean = false;

	constructor(private changeDetectorRef: ChangeDetectorRef) {}

	@HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showScrollBtn = window.scrollY > 500;
    this.changeDetectorRef.markForCheck();
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
