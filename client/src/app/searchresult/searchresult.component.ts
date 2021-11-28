import { Component, OnInit } from '@angular/core';
import { ItemDetails } from '../shared/itemDetails';

import { ItemsearchService } from '../services/itemsearch.service';
import { FetchLocationService } from '../services/fetch-location.service';

import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss']
})

export class SearchresultComponent implements OnInit {

  items : ItemDetails[]
  selectedItem : ItemDetails

  constructor(private route: ActivatedRoute, private ItemSearchService : ItemsearchService, private fetchLocationService : FetchLocationService) { }

  ngOnInit(): void {
    this.items = this.ItemSearchService.getItems();
  }

  alertlocation(id) : void {
    this.fetchLocationService.getitem(id)
      .subscribe((item) => {
        this.selectedItem = item;
        alert(this.selectedItem.latitude + ' ' + this.selectedItem.longitude)
      });
  }
}
