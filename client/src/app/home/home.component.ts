import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Maps, Zoom, Marker, NavigationLine } from '@syncfusion/ej2-angular-maps';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlaceSuggestion } from '../autocomplete/autocomplete.component';
import { MyMapComponent } from '../my-map/my-map.component';
import { FetchLocationService } from '../services/fetch-location.service';

// Maps.Inject(Zoom, Marker, NavigationLine);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
//http://dev.virtualearth.net/REST/v1/Locations/{locationQuery}?includeNeighborhood={includeNeighborhood}&maxResults={maxResults}&include={includeValue}&key={BingMapsKey}
export class HomeComponent implements OnInit {
  // latitude!: number;
  // longitude!: number;
  // layerType: string;
  // bingMapType: string;
  // key: string;
  // zoomSettings: object;
  // centerPosition: object;
  // markerSettings: object;
  // navigationLineSettings: object;
  // animationDuration: number;
  // data: any;
  // url: string;
  // search: string;

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  constructor(private http: HttpClient, private fetchlocationService : FetchLocationService) { }

  autocompleteChanged(value: PlaceSuggestion) {
    let mapObject = new MyMapComponent(this.fetchlocationService);
    mapObject.changevalue(value);
  }

  ngOnInit() {
  //   this.layerType = 'Bing';
  //   this.bingMapType = 'CanvasLight';
  //   this.key = 'Aq_SQGuUZhOe3T_7pzblEltG7zdj-BMOKbsab4hUGtkSfTl33r9b85z5A-FdTsh8';
  //   this.url = 'http://dev.virtualearth.net/REST/v1/Locations/White%20House?1&key=' + this.key
  //   // this.http.get<any>(this.url).subscribe(data => {
  //   //   console.log(data)
  //   // }) 
  //   this.zoomSettings = {
  //     zoomFactor: 15
  //   };
  //   this.centerPosition = {
  //     latitude: 34.06062,
  //     longitude: -118.330491,
  //   };
  //   this.markerSettings = [
  //     {
  //       visible: true,
  //       height: 25,
  //       width: 25,
  //       dataSource: [
  //         {
  //           latitude: 34.06062,
  //           longitude: -118.330491,
  //           name: 'California'
  //         // },
  //         // {
  //         //   latitude: 40.724546,
  //         //   longitude: -73.850344,
  //         //   name: 'New York'
  //         }
  //       ]
  //     }
  //   ];
  //   this.navigationLineSettings = [{
  //       // visible: true,
  //       // color: 'blue',
  //       // width: 5,
  //       // angle: 0.1,
  //       // latitude: [34.06062, 40.724546],
  //       // longitude: [-118.330491, -73.850344]
  //   }];
  }
}
