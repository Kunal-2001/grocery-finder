import { Injectable } from "@angular/core";

import { Location } from "../shared/location";
import { getPosi } from "../shared/current_location";
import { propertyList } from "../shared/initial_location";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FetchLocationService {
  constructor() {}

  async getcurrentLocation() {
    const z = await getPosi();
    console.log(z);
  }
}
