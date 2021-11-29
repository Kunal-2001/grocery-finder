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

  public lefletMap;
  marker0: any;

  constructor(private fetchlocationService: FetchLocationService) {}

  ngOnInit() {
    this.lefletMap = L.map("map", { center: [32.203505, 30.753307], zoom: 1 });
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
      shadowSize: [35, 35],
    });
    L.Marker.prototype.options.icon = iconDefault;
    L.tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution:
        'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
      apiKey: environment.GeoAPIfy_KEY,
      maxZoom: 20,
      id: "osm-bright",
    } as any).addTo(this.lefletMap);
  }

  ngAfterViewInit() {
    this.fetchlocationService.getcurrentLocation().then((data) => {
      setTimeout(() => {
        this.changeinitialvalue(data);
      }, 2000);
    });
  }

  changeinitialvalue(value) {
    console.log(this.lefletMap);

    this.lefletMap.flyTo([value.latitude, value.longitude], 15, {
      animate: true,
      duration: 8,
    });
    this.marker0 = L.marker([value.latitude, value.longitude])
      .addTo(this.lefletMap)
      .bindPopup(value.fulladdress)
      .openPopup();
  }

  changevalue(value) {
    console.log(value);

    this.lefletMap.flyTo([value.data.lat, value.data.lon], 15, {
      animate: true,
      duration: 8,
    });
    L.marker([value.data.lon, value.data.lat])
      .addTo(this.lefletMap)
      .addTo(this.lefletMap)
      .bindPopup(value.fulladdress)
      .openPopup();
  }
}
