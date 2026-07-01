import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./rumour-engines/rumour-engines.module').then(m => m.RumourEnginesModule)
  },
  {
    path: 'rumours-list',
    loadChildren: () => import('./rumours-list/rumours-list.module').then(m => m.RumoursListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
