import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FiltersComponent } from './filters/filters.component';
import { VerticalTimelineComponent } from './vertical-timeline/vertical-timeline.component';
import { BackToTopComponent } from './back-to-top/back-to-top.component';

@NgModule({
  declarations: [
    AppComponent,
		FiltersComponent,
    VerticalTimelineComponent,
    BackToTopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
