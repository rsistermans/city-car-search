import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CarSearchComponent } from './components/car-search/car-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SearchAutocompleteComponent } from './components/search-autocomplete/search-autocomplete.component';
import { CarSearchResultsComponent } from './components/car-search-results/car-search-results.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    CarSearchComponent,
    SearchInputComponent,
    SearchAutocompleteComponent,
    CarSearchResultsComponent,
    SearchFilterComponent,
  ],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
