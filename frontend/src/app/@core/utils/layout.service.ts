import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { delay, share } from 'rxjs/operators';

@Injectable()
export class LayoutService {
  protected layoutSize$: Subject<any> = new Subject();

  changeLayoutSize(): void {
    this.layoutSize$.next();
  }

  onChangeLayoutSize(): Observable<any> {
    return this.layoutSize$.pipe(
      share(),
      delay(1),

    );
  }
}
