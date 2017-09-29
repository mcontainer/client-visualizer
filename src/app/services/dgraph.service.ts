import { Injectable } from '@angular/core';
import { D_GRAPH_RESPONSE } from '../../assets/mock';
import {Http} from '@angular/http';

@Injectable()
export class DGraphService {

  constructor(private http: Http) { }

  getTopology(stack: string) {
    return this.http.get(`http://localhost:8081/topology/${stack}`).map(r => r.json());
  }

  getContent() {
    return D_GRAPH_RESPONSE;
  }
}
