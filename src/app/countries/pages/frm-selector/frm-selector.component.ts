import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';

@Component({
   selector: 'app-frm-selector',
   templateUrl: './frm-selector.component.html',
   styleUrl: './frm-selector.component.css'
})
export class FrmSelectorComponent implements OnInit {

   public countriesByRegions: SmallCountry[] = [];
   public borders: SmallCountry[] = [];

   public frmSelector: FormGroup = this.fb.group({
      region:  ['', Validators.required],
      country: ['', Validators.required],
      border:  ['', Validators.required],
   });

   constructor(
      private fb: FormBuilder,
      private countriesService: CountriesService,
   ) { }

   get regions(): Region[] {
      return this.countriesService.regions;
   }

   ngOnInit(): void {

      this.onRegionChange();
      this.onCountryChange();

   }

   private onRegionChange(): void {
      this.frmSelector.get('region')!.valueChanges
         .pipe(
            tap( () => this.frmSelector.get('country')?.setValue('')), /* Disparar un efecto secundario */
            tap( () => this.borders = []),
            switchMap(region => this.countriesService.getCountriesByRegion(region)) /* Con switchMap ya no hay la necesidad de un subscribe para su ejecución */
         )
         .subscribe(countries => {
            // console.log({countries});
            this.countriesByRegions = countries;
         })
   }

   private onCountryChange(): void {
      this.frmSelector.get('country')!.valueChanges
         .pipe(
            tap(() => this.frmSelector.get('border')?.setValue('')),
            filter( (valor: string) => valor.length > 0 ),
            switchMap( alphaCode => this.countriesService.getBordersByAlphaCode(alphaCode)), /* Con switchMap ya no hay la necesidad de subscribe para su ejecución */
            switchMap( country => this.countriesService.getCountryBordersByCodes( country.borders )),
         )
         .subscribe(countries => {
            // console.log({countries});
            this.borders = countries;
         })
   }



}
