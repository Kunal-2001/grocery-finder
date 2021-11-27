import { Location } from './location';

var lng : number;
var lat : number;

var currentLoacation : Location;
 
navigator.geolocation.getCurrentPosition((position) => { 
    currentLoacation.fulladdress = "Current Location";
    currentLoacation.longitude = position.coords.longitude;
    currentLoacation.latitude = position.coords.latitude;
});

export var propertyList =[currentLoacation]