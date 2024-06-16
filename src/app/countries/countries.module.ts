import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CountriesRoutingModule } from './countries-routing.module';
import { FrmSelectorComponent } from './pages/frm-selector/frm-selector.component';


@NgModule({
   declarations: [
      FrmSelectorComponent,
   ],
   imports: [
      CommonModule,
      CountriesRoutingModule,
      ReactiveFormsModule
   ],
   exports: [
   ]
})
export class CountriesModule { }
