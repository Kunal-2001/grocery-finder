import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Maps, Zoom, Marker, NavigationLine } from '@syncfusion/ej2-angular-maps';

Maps.Inject(Zoom, Marker, NavigationLine);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  latitude!: number;
  longitude!: number;
  layerType: string;
  bingMapType: string;
  key: string;
  zoomSettings: object;
  centerPosition: object;
  markerSettings: object;
  navigationLineSettings: object;
  animationDuration: number;

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  constructor() { }

  ngOnInit() {
    this.layerType = 'Bing';
    this.bingMapType = 'CanvasLight';
    this.key = 'Aq_SQGuUZhOe3T_7pzblEltG7zdj-BMOKbsab4hUGtkSfTl33r9b85z5A-FdTsh8';
    this.zoomSettings = {
      zoomFactor: 15
    };
    this.centerPosition = {
      latitude: 34.06062,
      longitude: -118.330491,
    };
    this.markerSettings = [
      {
        visible: true,
        height: 25,
        width: 25,
        dataSource: [
          {
            latitude: 34.06062,
            longitude: -118.330491,
            name: 'California'
          // },
          // {
          //   latitude: 40.724546,
          //   longitude: -73.850344,
          //   name: 'New York'
          }
        ]
      }
    ];
    this.navigationLineSettings = [{
        // visible: true,
        // color: 'blue',
        // width: 5,
        // angle: 0.1,
        // latitude: [34.06062, 40.724546],
        // longitude: [-118.330491, -73.850344]
    }];
  }
}
