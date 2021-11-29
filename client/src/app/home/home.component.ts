import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from "@angular/core"; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PlaceSuggestion } from "../autocomplete/autocomplete.component";
import { MyMapComponent } from "../my-map/my-map.component";
import { FetchLocationService } from "../services/fetch-location.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  @ViewChild(MyMapComponent) m: MyMapComponent;
  public searchElementRef!: ElementRef;

  // private mapObject: MyMapComponent;

  constructor(
    private http: HttpClient,
    private fetchlocationService: FetchLocationService
  ) {}

  autocompleteChanged(value: PlaceSuggestion) {
    // console.log(this.mapObject);

    this.m.changevalue(value);
  }

  ngOnInit() {
    this.m = new MyMapComponent(this.fetchlocationService);
  }
}
