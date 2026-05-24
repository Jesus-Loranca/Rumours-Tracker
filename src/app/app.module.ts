import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './rumour-engines/footer/footer.component';
import { RumoursModule } from './rumour-engines/rumours/rumours.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		RumoursModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
