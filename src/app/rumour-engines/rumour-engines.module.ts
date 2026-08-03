import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter/counter.component';
import { FiltersComponent } from './filters/filters.component';
import { GridViewComponent } from './grid-view/grid-view.component';
import { VerticalTimelineComponent } from './vertical-timeline/vertical-timeline.component';
import { RumoursComponent } from './rumours/rumours.component';
import { BackToTopComponent } from '../common/back-to-top/back-to-top.component';

const routes: Routes = [
  { path: '', component: RumoursComponent }
];

@NgModule({
  declarations: [
		RumoursComponent,
		FiltersComponent,
		CounterComponent,
    VerticalTimelineComponent,
		GridViewComponent
  ],
  imports: [
    CommonModule,
		FormsModule,
    RouterModule.forChild(routes),
    BackToTopComponent
  ]
})

export class RumourEnginesModule { }
