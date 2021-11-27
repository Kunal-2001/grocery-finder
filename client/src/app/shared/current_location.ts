import { Location } from './location';

var lng : number;
var lat : number;

navigator.geolocation.getCurrentPosition((position) => { 
    globalThis.lng = position.coords.longitude,
    globalThis.lat = position.coords.latitude
});

export const currentLoacation: Location = {
    fulladdress : "Current Location",
    longitude : lng,
    latitude : lat
}