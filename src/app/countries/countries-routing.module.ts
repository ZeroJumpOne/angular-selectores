import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrmSelectorComponent } from './pages/frm-selector/frm-selector.component';

const routes: Routes = [
   // {
   //    path: '',
   //    component: FrmSelectorComponent,
   // },
   // {
   //    path: '**',
   //    redirectTo: 'selector',
   // }
   {
      path: '',
      children: [
         { path: 'selector', component: FrmSelectorComponent },
         { path: '**',       redirectTo: 'selector' },
      ]

   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule { }
