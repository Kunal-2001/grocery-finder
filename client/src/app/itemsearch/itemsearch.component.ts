import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itemsearch',
  templateUrl: './itemsearch.component.html',
  styleUrls: ['./itemsearch.component.scss']
})
export class ItemsearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  search : String ="";
}
 