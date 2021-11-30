import { Location } from "./location";
import * as L from "leaflet";

let current_location : Location = {
  latitude : 0,
  longitude : 0,
  fulladdress : 'NA'
}

let map_dup : L.Map;

let markers : L.Marker[] = [];

let geoLayers : L.GeoJSON[] = [];

function change_value(value){
  current_location = {
    latitude : value.latitude,
    longitude : value.longitude,
    fulladdress : value.fulladdress
  }
}

function change_map(value){
  map_dup = value;
}

function empty_markers(){
  while (markers.length > 0){
    markers.pop();
  }
}

function remove_last_marker(){
  markers.pop();
}

function remove_geo(){
  geoLayers.pop();
}

function add_marker(value){
  var marker = L.marker([value.latitude, value.longitude])
  .addTo(map_dup)
  .bindPopup('<p class = "popup">'+value.fulladdress+'</p>', {closeButton: false})
  .openPopup();
  markers.push(marker);
  var markergrp = L.featureGroup(markers)
    .addTo(map_dup);
}

function add_geo(value){
  geoLayers.push(value);
  // L.layerGroup(geoLayers).addTo(map_dup);
}

export {current_location, change_value, map_dup, change_map, markers, empty_markers, add_marker, remove_last_marker, remove_geo, add_geo, geoLayers}