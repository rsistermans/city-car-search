import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  @Input() title!: string;
  @Input() options!: { [key: string]: string };
  @Input() control!: FormControl;
  @Output() onFilterChange = new EventEmitter<void>();
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onFilterChange.emit());
  }

  get optionKeys(): string[] {
    return Object.keys(this.options);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
