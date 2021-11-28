import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";
import { map, catchError } from 'rxjs/operators';

import { ProcessHttpmsgService } from "./process-httpmsg.service";

import { Location } from "../shared/location";
import { getPosi } from "../shared/current_location";
import { propertyList } from "../shared/initial_location";
import { Observable, of } from "rxjs";

import { ItemDetails } from "../shared/itemDetails";
import { ItemsearchService } from "./itemsearch.service";

@Injectable({
  providedIn: "root",
})

export class FetchLocationService {
  constructor(private processHTTPMsgService: ProcessHttpmsgService, private http: HttpClient, private ItemSearchService : ItemsearchService) {}

  getitem(id : number):Observable<ItemDetails>{
    return this.http.get<ItemDetails>(baseURL + 'items/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async getcurrentLocation() {
    const z : any = await getPosi();
    // console.log(z);
    // async getcurrentLocation() : Promise<Location> {
    //   const z : any = await getPosi();
    const data : Location = {
      fulladdress : "Current Location",
      longitude : z.coords.longitude,
      latitude : z.coords.latitude
    }
    //console.log(data)
    return data;
  }
}
