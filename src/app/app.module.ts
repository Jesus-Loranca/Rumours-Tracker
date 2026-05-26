import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { SectionTitleComponent } from "./common/section-title/section-title.component";

@NgModule({
  declarations: [
    AppComponent,
		HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SectionTitleComponent
],
  bootstrap: [AppComponent]
})
export class AppModule { }
