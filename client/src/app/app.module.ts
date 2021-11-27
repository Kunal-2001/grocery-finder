import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import { LegendService, MarkerService, MapsTooltipService, DataLabelService, BubbleService, NavigationLineService, SelectionService, AnnotationsService, ZoomService } from '@syncfusion/ej2-angular-maps';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

import { FeedbackService } from './services/feedback.service';
import { ContactusComponent } from './contactus/contactus.component';
import { IndexComponent } from './index/index.component';
import { MainHeaderComponent } from './main-header/main-header.component';

import { baseURL } from './shared/baseurl';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { MyMapComponent } from './my-map/my-map.component';
import { ItemsearchComponent } from './itemsearch/itemsearch.component';
import { SearchresultComponent } from './searchresult/searchresult.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    FeedbackComponent,
    AboutComponent,
    HomeComponent,
    ContactusComponent,
    IndexComponent,
    MainHeaderComponent,
    AutocompleteComponent,
    MyMapComponent,
    ItemsearchComponent,
    SearchresultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MapsModule,
    CommonModule,
    MatAutocompleteModule,
    MatTooltipModule,
  ],
  providers: [
    FeedbackService,
    {provide: 'baseURL', useValue: baseURL},
    ZoomService,
    LegendService, MarkerService, MapsTooltipService, DataLabelService, BubbleService, NavigationLineService, SelectionService, AnnotationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
