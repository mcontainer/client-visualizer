import { Injectable } from '@angular/core';
import { D_GRAPH_RESPONSE } from '../../assets/mock';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DGraphService {

  constructor(private http: Http) { }

  getTopology(stack: string) {
    return this.http.get(`http://172.17.8.103:8081/topology/${stack}`).map(r => r.json());
  }

  getContent() {
    return Observable.of(D_GRAPH_RESPONSE);
  }
}
