import { Component, OnInit } from '@angular/core';
import { ItemDetails } from '../shared/itemDetails';

import { ItemsearchService } from '../services/itemsearch.service';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss']
})

export class SearchresultComponent implements OnInit {

  items : ItemDetails[]

  constructor(private ItemSearchService : ItemsearchService) { }

  ngOnInit(): void {
    this.items = this.ItemSearchService.getItems()
  }

}
