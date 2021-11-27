import { Injectable } from '@angular/core';
 
import { Location } from '../shared/location';
import { currentLoacation } from '../shared/current_location';
import { propertyList } from '../shared/initial_location';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchLocationService {

  constructor() { }

  // getinitialLocation(): Observable<Location> {

  // }

  getcurrentLocation(): Observable<Location> {
    return of(currentLoacation).pipe();
  }
}
