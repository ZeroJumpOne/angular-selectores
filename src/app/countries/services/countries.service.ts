import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map, of, tap } from 'rxjs';

import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';

@Injectable({
   providedIn: 'root'
})
export class CountriesService {

   private baseUrl: string = 'https://restcountries.com/v3.1';

   private _regions: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania];

   constructor(private http: HttpClient) { }

   get regions(): Region[] {

      return [...this._regions]; /* copia de los datos, para que no se cambie la informacion */

   }

   public getCountriesByRegion(region: Region): Observable<SmallCountry[]> {

      if (!region) return of([]);

      const url = `${this.baseUrl}/region/${region}?fields=name,cca3,borders`;
      // console.log({url});

      // let sc: SmallCountry;

      return this.http.get<Country[]>(url)
         .pipe(
            map(countries => countries.map(country => ({
               name: country.name.common,
               cca3: country.cca3,
               borders: country.borders ?? []
            }))),
            // tap( rsp => console.log({rsp}))
         )

      // return this.http.get<Country[]>(url)
      //    .pipe(
      //       map( countries => countries.map( country => {
      //          return sc = { name: country.name.official, cca3: country.cca3, borders: country.borders ?? [] }

      //       })),
      //       tap( rsp => console.log({rsp}))
      //    )
   }

   // Las fronteras tambien son paises
   getBordersByAlphaCode(alphaCode: string): Observable<SmallCountry> {

      const url = `${this.baseUrl}/alpha/${alphaCode}?fields=name,cca3,borders`;
      // console.log({ url });

      return this.http.get<Country>(url)
         .pipe(
            map( country => ({
               name: country.name.common,
               cca3: country.cca3,
               borders: country.borders ?? []
            })),
         )
   }

   getCountryBordersByCodes( borders: string[] ): Observable<SmallCountry[]> {
      if (!borders || borders.length === 0) return of([]);

      const countryRequest: Observable<SmallCountry>[] = [];

      borders.forEach( code => {

         const request = this.getBordersByAlphaCode(code)
         countryRequest.push(request);
      });

      return combineLatest( countryRequest );
   }


}
