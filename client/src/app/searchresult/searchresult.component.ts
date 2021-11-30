import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemDetails } from '../shared/itemDetails';

import { ItemsearchService } from '../services/itemsearch.service';
import { FetchLocationService } from '../services/fetch-location.service';

import { Params, ActivatedRoute } from '@angular/router';

import { MyMapComponent } from '../my-map/my-map.component';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss'],
  providers: [MyMapComponent]
})

export class SearchresultComponent implements OnInit {
  items : ItemDetails[]
  constructor(private map_component : MyMapComponent, private route: ActivatedRoute, private ItemSearchService : ItemsearchService, private fetchLocationService : FetchLocationService) { }

  ngOnInit(): void {
    this.ItemSearchService.getItems()
      .subscribe((data) => {
        this.items = data;
      });
  }  

  showpath(id) : void {
    this.fetchLocationService.getitem(id)
      .subscribe((item) => {
        this.map_component.showroute(item);
      });
  }
}
