import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackToTopComponent } from '../back-to-top/back-to-top.component';
import { CounterComponent } from '../counter/counter.component';
import { FiltersComponent } from '../filters/filters.component';
import { GridViewComponent } from '../grid-view/grid-view.component';
import { VerticalTimelineComponent } from '../vertical-timeline/vertical-timeline.component';
import { RumoursComponent } from './rumours.component';

const routes: Routes = [
  { path: '', component: RumoursComponent }
];

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
    CommonModule,
		FormsModule,
    RouterModule.forChild(routes)
  ]
})

export class RumoursModule { }
