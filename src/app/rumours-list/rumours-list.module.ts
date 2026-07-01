import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RumoursIndexComponent } from './rumours-index/rumours-index.component';
import { RumoursListComponent } from './rumours-list.component';
import { RumoursListItemsComponent } from './rumours-list-items/rumours-list-items.component';
import { RumoursListItemComponent } from './rumours-list-item/rumours-list-item.component';
import { SectionTitleComponent } from '../common/section-title/section-title.component';
import { OrdinalPipe } from './ordinal.pipe';

const routes: Routes = [
  { path: '', component: RumoursListComponent }
];

@NgModule({
  declarations: [RumoursListComponent, RumoursIndexComponent, RumoursListItemsComponent, RumoursListItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SectionTitleComponent,
		OrdinalPipe
  ]
})
export class RumoursListModule { }
