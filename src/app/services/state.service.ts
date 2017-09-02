import {Injectable} from '@angular/core';
import * as Rx from 'rxjs/Rx';
import {Node} from '../d3/models';


interface IState {
  isOpen: boolean;
  info: Node | null
}

@Injectable()
export class StateService {

  initial: IState = {
    isOpen: false,
    info: null
  };

  action$: Rx.Subject<any>;

  store$: Rx.Observable<IState>;

  static reducer = (state: IState, action) => {
    switch (action.type) {
      case 'OPEN':
        return {...state, isOpen: action.payload};
      case 'INFO':
        return {...state, info: action.payload};
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


}
