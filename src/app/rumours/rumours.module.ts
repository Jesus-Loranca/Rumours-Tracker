import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BackToTopComponent } from '../back-to-top/back-to-top.component';
import { CounterComponent } from '../counter/counter.component';
import { FiltersComponent } from '../filters/filters.component';
import { GridViewComponent } from '../grid-view/grid-view.component';
import { VerticalTimelineComponent } from '../vertical-timeline/vertical-timeline.component';
import { RumoursComponent } from './rumours.component';

@NgModule({
  declarations: [
		RumoursComponent,
		FiltersComponent,
		CounterComponent,
    VerticalTimelineComponent,
		GridViewComponent,
    BackToTopComponent
  ],
  imports: [
    BrowserModule,
		FormsModule
  ],
	exports: [
		RumoursComponent
	],
  bootstrap: [RumoursComponent]
})

export class RumoursModule { }
