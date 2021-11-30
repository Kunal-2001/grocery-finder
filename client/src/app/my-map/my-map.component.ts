import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import * as L from "leaflet";
import { icon } from "leaflet";


import { FetchLocationService } from "../services/fetch-location.service";
import { current_location, change_value, map_dup, change_map, markers, empty_markers, add_marker, remove_last_marker, remove_geo, add_geo, geoLayers } from "../shared/current_location";

import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-my-map",
  templateUrl: "./my-map.component.html",
  styleUrls: ["./my-map.component.scss"],
})

export class MyMapComponent implements OnInit, AfterViewInit {
  @ViewChild("map")
  private mapContainer: ElementRef<HTMLElement>;

  constructor(private fetchlocationService: FetchLocationService) {}

  ngOnInit() {
    var lefletMap = L.map("map", { center: [32.203505, 30.753307], zoom: 1 });
    const isRetina = L.Browser.retina;
    const baseUrl =
      "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
    const retinaUrl =
      "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";

    const iconRetinaUrl = "assets/marker/marker-icon-2x.png";
    const iconUrl = "assets/marker/marker3.png";
    const shadowUrl = "assets/marker/marker-shadow.png";
    const iconDefault = icon({
      iconUrl,
      shadowUrl,
      iconSize: [25, 38],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [0, 0],
    });
    L.Marker.prototype.options.icon = iconDefault;
    L.tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution:
        'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
      apiKey: environment.GeoAPIfy_KEY,
      maxZoom: 20,
      id: "osm-bright",
    } as any).addTo(lefletMap);
    change_map(lefletMap);
  }

  ngAfterViewInit() {
    this.fetchlocationService.getcurrentLocation().then((data) => {
      setTimeout(() => {
        this.changeinitialvalue(data);
      }, 2000);
    });
  }

  changeinitialvalue(value) {
    change_value(value);
    var lefletMap = map_dup;
    lefletMap = lefletMap.flyTo([value.latitude, value.longitude], 15, { animate: true, duration: 8 });
    change_map(lefletMap);
    add_marker(value);
  }

  changevalue(value) {
    var lefletMap = map_dup;
    if (markers.length > 1){
      lefletMap.removeLayer(markers[1]);
      remove_last_marker();
      lefletMap.removeLayer(geoLayers[0]);
      remove_geo();
      change_map(lefletMap);
    }
    var curr_loc = {
      latitude : value.data.lat,
      longitude : value.data.lon,
      fulladdress : value.fullAddress
    }
    change_value(curr_loc);
    lefletMap = map_dup;
    lefletMap.flyTo([value.data.lat, value.data.lon], 15, { animate: true, duration: 8 });
    lefletMap.removeLayer(markers[0]);
    change_map(lefletMap);
    empty_markers();
    add_marker(curr_loc);
  }

  showroute(value) : void{
    var lefletMap = map_dup;
    if (markers.length > 1){
      lefletMap.removeLayer(markers[1]);
      remove_last_marker();
      lefletMap.removeLayer(geoLayers[0]);
      remove_geo();
      change_map(lefletMap);
    }
    this.fetchlocationService.getroute(current_location, value).subscribe((data) => {
      add_marker(value);

      //console.log(data);
      var group = L.featureGroup(markers);
      lefletMap.fitBounds(group.getBounds().pad(0.5));

      add_geo(L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
          console.log(feature)
          layer.bindPopup(
            '<div class = "popup m-0" style = "width : 155px">\
              <div class="container">\
                <div class="row align-items-start">\
                  <div class="col-9 p-0 align-items-center">\
                    <p>Addresss hereeeee</p>\
                  </div>\
                </div>\
                <div class="row align-items-start">\
                  <div class="col-9 p-0 align-items-center">\
                    <h3>\<b>' + feature.properties.distance +' m</b>\</h3>\
                  </div>\
                  <div class="col-3 p-0">\
                    <img src="assets/images/walk.png" style="height:34px;">\
                  </div>\
                </div>\
                <div class="row align-items-start">\
                  <div class="col-4 p-0">\
                    <img src="assets/images/clock.png" style="height:34px;">\
                  </div>\
                  <div class="col-8 p-0 align-items-center">\
                    <h3>\<b>' + Math.round(feature.properties.time / 60) + ' min</b>\</h3>\
                  </div>\
                </div>\
              </div>\
            </div>'
            , { closeButton: false }
            );
          layer.openPopup();
        }
      }).addTo(map_dup));
      
      lefletMap = map_dup;
      change_map(lefletMap);
    })
  }
}
