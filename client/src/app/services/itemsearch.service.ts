import { Injectable } from '@angular/core';
import { ItemDetails } from '../shared/itemDetails';
import { ITEMS } from '../shared/items';

@Injectable({
  providedIn: 'root'
})

export class ItemsearchService {

  constructor() { }

  getItems() {
    return ITEMS;
  }
}
