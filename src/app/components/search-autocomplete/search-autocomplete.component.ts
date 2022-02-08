import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../../services/city-search.service';

@Component({
  selector: 'app-search-autocomplete',
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.scss'],
})
export class SearchAutocompleteComponent {
  @Input() results!: Observable<City[]>;
  @Output() onAutocomplete = new EventEmitter<City>();

  onClick(result: City): void {
    this.onAutocomplete.emit(result);
  }
}
