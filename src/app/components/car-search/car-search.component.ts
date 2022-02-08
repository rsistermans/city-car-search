import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { City, CitySearchService } from '../../services/city-search.service';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import {
  CarSearchCountry,
  CarSearchResponse,
  CarSearchService,
  CarSearchSortOrder,
} from '../../services/car-search.service';

@Component({
  selector: 'app-car-search',
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.scss'],
})
export class CarSearchComponent {
  searchForm: FormGroup;
  cities$: Observable<City[]> = of([]);
  searchData$!: Observable<CarSearchResponse>;
  errorMessage: string = '';
  filters: { [key: string]: { [key: string]: string } };
  private selectedCity?: City;

  constructor(
    private citySearchService: CitySearchService,
    private carSearchService: CarSearchService,
    private fb: FormBuilder
  ) {
    this.filters = {
      distance: {
        3000: '3 km',
        5000: '5 km',
        7000: '7 km',
      },
      sort: {
        price: 'Price',
        recommended: 'Recommended',
        distance: 'Distance',
      },
    };
    this.searchForm = this.fb.group({
      query: '',
      distance: Object.keys(this.filters['distance'])[0],
      sort: Object.keys(this.filters['sort'])[0],
    });
  }

  onQueryChange(query: string): void {
    this.selectedCity = undefined;
    if (query) {
      this.cities$ = this.citySearchService.searchCities(query);
    }
  }

  onClear(): void {
    this.cities$ = of([]);
  }

  selectCity(city: City): void {
    this.selectedCity = city;
    this.search();
  }

  search(): void {
    if (!this.selectedCity) {
      return;
    }
    const { lng, lat, name } = this.selectedCity;
    const maxDistance = this.distanceControl.value;
    const sort = this.sortControl.value;
    // update control value without emitting event to prevent circular loop
    this.queryControl.setValue(name, { emitEvent: false });
    // manually clear results
    this.onClear();
    // apply search
    this.searchData$ = this.carSearchService
      .searchCars$(lng, lat, maxDistance, sort, CarSearchCountry.NL)
      .pipe(
        tap(this.clearError.bind(this)),
        catchError(this.handleError.bind(this))
      );
  }

  onFilterSelect(): void {
    if (this.selectedCity) {
      this.search();
    }
  }

  handleError(error: unknown): Observable<never> {
    this.errorMessage = 'Something went wrong!';
    return throwError(() => error);
  }

  clearError(): void {
    this.errorMessage = '';
  }

  get queryControl(): FormControl {
    return this.searchForm.get('query') as FormControl;
  }

  get distanceControl(): FormControl {
    return this.searchForm.get('distance') as FormControl;
  }

  get sortControl(): FormControl {
    return this.searchForm.get('sort') as FormControl;
  }
}
