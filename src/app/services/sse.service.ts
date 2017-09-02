import { Injectable } from '@angular/core';
import { EventSourcePolyfill } from 'ng-event-source';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class SseService {

  constructor() { }

  public createSSE(url: string): Rx.Observable<String> {
    return Rx.Observable.create((observer) => {
      const sse = new EventSourcePolyfill(url, {withCredentials: true});
      sse.onmessage = event => observer.next(event.data);
      sse.onerror = error => observer.error(error);
    });
  }

}
