import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { LoadingType } from './loading-type';
import { LoadingService } from './loading.service';

@Component({
  selector: 'ap-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit {

  loading$: Observable<string>

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loading$ = this.loadingService
      .getLoading()
      .pipe(map(loadingType => loadingType.valueOf()));
  }


}
