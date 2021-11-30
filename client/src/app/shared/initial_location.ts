var lng: number = 1;
var lat: number = 2;

export function getPosi() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
 