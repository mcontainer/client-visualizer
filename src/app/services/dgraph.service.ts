import { Injectable } from '@angular/core';
import { D_GRAPH_RESPONSE } from '../../assets/mock';

@Injectable()
export class DGraphService {

  constructor() {
  }

  getContent() {
    return D_GRAPH_RESPONSE;
  }
}
