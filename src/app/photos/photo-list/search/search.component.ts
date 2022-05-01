import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'ap-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

  debounce: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    this.debounce
      .pipe(debounceTime(300));
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  applyFilter(event: Event): string {

    const filterValue = (event.target as HTMLInputElement).value;;
    return filterValue
  }
}
