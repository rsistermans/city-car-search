import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit, OnDestroy {
  @Input() control!: FormControl;
  @Input() debounce: number = 500;
  @Output() query = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  private destroy$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(
        // clear any result when user starts typing
        tap(() => this.clear.emit()),
        // then perform an update every n milliseconds
        debounceTime(this.debounce),
        takeUntil(this.destroy$)
      )
      .subscribe((query) => this.query.emit(query));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
