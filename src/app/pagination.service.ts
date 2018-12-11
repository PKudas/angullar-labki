import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  pageCountLoaded = new BehaviorSubject<number>(0);

  constructor() { }

  loaded(pageCount) {
    this.pageCountLoaded.next(pageCount);
  }
}
