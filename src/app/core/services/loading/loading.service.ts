import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs/Subject';

interface LoadingStatus {
  active: boolean;
}

@Injectable()
export class LoadingService {
  private loadingSubject = new Subject<LoadingStatus>();
  // loadingState = this.loadingSubject.asObservable().delay(10);

  counter = 0;

  constructor( @Optional() @SkipSelf() prior: LoadingService) {
    if (prior) { return prior; }
  }

  show() {
    this.loadingSubject.next(<LoadingStatus>{ active: true });
    this.counter++;
  }

  hide() {
    this.counter--;
    if (this.counter === 0) {
      this.loadingSubject.next(<LoadingStatus>{ active: false });
      }
  }
}
