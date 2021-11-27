import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import * as L from "leaflet";
import { icon } from "leaflet";

import { FetchLocationService } from "../services/fetch-location.service";
import { Location } from "../shared/location";

import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-my-map",
  templateUrl: "./my-map.component.html",
  styleUrls: ["./my-map.component.scss"],
})
export class MyMapComponent implements OnInit, AfterViewInit {
  current_location: Location;

  @ViewChild("map")
  private mapContainer: ElementRef<HTMLElement>;

  lefletMap: L.Map;
  marker0: any;

  constructor(private fetchlocationService: FetchLocationService) {}

  ngOnInit() {}

  changevalue(value) {
    const newstate = { lng: value.data.lon, lat: value.data.lat, zoom: 15 };
    // this.lefletMap.removeLayer
    // this.lefletMap = map(this.mapContainer.nativeElement).setView([newstate.lat, newstate.lng], newstate.zoom);
    this.marker0 = L.marker([newstate.lat, newstate.lng]).addTo(this.lefletMap);
  }

  ngAfterViewInit() {
    this.fetchlocationService.getcurrentLocation();
    // .subscribe((locat) => (this.current_location = locat));
    // console.log(this.current_location);

    //const initialState = { lng: position.coords.longitude, lat: position.coords.latitude, zoom: 15 };
    this.lefletMap = L.map(this.mapContainer.nativeElement).setView(
      [this.current_location.longitude, this.current_location.latitude],
      15
    );

    const isRetina = L.Browser.retina;
    const baseUrl =
      "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
    const retinaUrl =
      "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";

    const iconRetinaUrl = "assets/marker/marker-icon-2x.png";
    const iconUrl = "assets/marker/marker-icon.png";
    const shadowUrl = "assets/marker/marker-shadow.png";
    const iconDefault = icon({
      iconUrl,
      shadowUrl,
      iconSize: [30, 30],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [31, 31],
    });
    L.Marker.prototype.options.icon = iconDefault;
    L.tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution:
        'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
      apiKey: environment.GeoAPIfy_KEY,
      maxZoom: 20,
      id: "osm-bright",
    } as any).addTo(this.lefletMap);
    L.marker([this.current_location.longitude, this.current_location.latitude])
      .addTo(this.lefletMap)
      .bindPopup(this.current_location.fulladdress)
      .openPopup();

    //this.leafletMap();
    //this.marker0 = L.marker([position.coords.latitude, position.coords.longitude]).addTo(this.lefletMap);
  }
  // leafletMap(): void {
  //   console.log(this.propertyList)
  //   for (const property of this.propertyList) {
  //     L.marker([property.lat, property.long]).addTo(this.lefletMap)
  //       .bindPopup(property.city)
  //       .openPopup();
  //   }
  // }
}

// propertyList = [
//   {
//       "city": "Cambridge",
//       "state": "MA",
//       "long": -71.10858,
//       "lat": 42.35963
//   },
//   {
//       "city": "Cambridge",
//       "state": "MA",
//       "long": -71.10869,
//       "lat": 42.359103
//   },
//   {
//       "city": "Boston",
//       "state": "MA",
//       "long": -71.110061,
//       "lat": 42.360686
//   },
//   {
//       "city": "Cambridge",
//       "long": -71.110448,
//       "lat": 42.360642
//   }
// ];
