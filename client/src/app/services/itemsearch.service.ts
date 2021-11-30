import { Injectable } from '@angular/core';
import { ItemDetails } from '../shared/itemDetails';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProcessHttpmsgService } from "./process-httpmsg.service";
import { baseURL } from "../shared/baseurl";
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ItemsearchService {

  constructor(private processHTTPMsgService: ProcessHttpmsgService, private http: HttpClient) { }

  getItems() : Observable<ItemDetails[]> {
    return this.http.get<ItemDetails[]>(baseURL + 'items')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
