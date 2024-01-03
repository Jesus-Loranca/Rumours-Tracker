import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RumoursComponent } from './rumours.component';
import { FiltersComponent } from '../filters/filters.component';
import { VerticalTimelineComponent } from '../vertical-timeline/vertical-timeline.component';
import { BackToTopComponent } from '../back-to-top/back-to-top.component';

@NgModule({
  declarations: [
		RumoursComponent,
		FiltersComponent,
    VerticalTimelineComponent,
    BackToTopComponent
  ],
  imports: [
    BrowserModule
  ],
	exports: [
		RumoursComponent
	],
  bootstrap: [RumoursComponent]
})

export class RumoursModule { }
