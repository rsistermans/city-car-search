import { Component, Input } from '@angular/core';
import { CarResult } from '../../services/car-search.service';

@Component({
  selector: 'app-car-search-results',
  templateUrl: './car-search-results.component.html',
  styleUrls: ['./car-search-results.component.scss'],
})
export class CarSearchResultsComponent {
  @Input() carResults: CarResult[] = [];
  @Input() resultCount: number = 0;
}
