import { Injectable } from '@angular/core';
import { EventSourcePolyfill } from 'ng-event-source';
import * as Rx from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {StateService} from './state.service';

@Injectable()
export class SseService {

  constructor(private stateService: StateService) { }

  public createSSE(url: string): Rx.Observable<any> {
    return Rx.Observable.create((observer) => {
      const sse = new EventSourcePolyfill(url, {withCredentials: true});
      sse.onopen = () => this.stateService.dispatchWithoutPayload('NOT_LOADING');
      sse.onmessage = event => observer.next(JSON.parse(event.data));
      sse.onerror = error => observer.error(error);
      return () => sse.close();
    }).retryWhen((e: Observable<any>) => {
      return e.delay(2000).scan((count, err) => {
        this.stateService.dispatchWithoutPayload('LOADING');
        if (count >= 5) {
          throw err;
        } else {
          return count + 1
        }
      }, 0);
    });
  }

}
