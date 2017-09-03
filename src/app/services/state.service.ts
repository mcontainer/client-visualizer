import {Injectable} from '@angular/core';
import * as Rx from 'rxjs/Rx';
import {Node} from '../d3/models';


interface IState {
  isOpen: boolean;
  isLoading: boolean;
  info: Node | null;
  clusterSize: number;
}

@Injectable()
export class StateService {

  initial: IState = {
    isOpen: false,
    isLoading: true,
    info: null,
    clusterSize: 0
  };

  action$: Rx.BehaviorSubject<any>;

  store$: Rx.Observable<IState>;

  static reducer = (state: IState, action) => {
    switch (action.type) {
      case 'OPEN':
        return {...state, isOpen: action.payload};
      case 'LOADING':
        return {...state, isLoading: true};
      case 'NOT_LOADING':
        return {...state, isLoading: false};
      case 'INFO':
        return {...state, info: action.payload};
      case 'SIZE':
        return {...state, clusterSize: action.payload};
      default:
        return state;
    }
  };

  constructor() {
    this.action$ = new Rx.BehaviorSubject(this.initial);
    this.store$ = this.action$.scan(StateService.reducer);
  }

  // high order function
  dispatcher = (func) => (...args) => this.action$.next(func(...args));

  dispatch(type: string, payload: any) {
    this.action$.next({type, payload})
  }

  dispatchWithoutPayload(type: string) {
    this.action$.next({type});
  }


}
