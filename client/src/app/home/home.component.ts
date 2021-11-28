import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlaceSuggestion } from '../autocomplete/autocomplete.component';
import { MyMapComponent } from '../my-map/my-map.component';
import { FetchLocationService } from '../services/fetch-location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef!: ElementRef;

  constructor(private http: HttpClient, private fetchlocationService : FetchLocationService) { }

  autocompleteChanged(value: PlaceSuggestion) {
    let mapObject = new MyMapComponent(this.fetchlocationService);
    mapObject.changevalue(value);
  }

  ngOnInit() {}
}
