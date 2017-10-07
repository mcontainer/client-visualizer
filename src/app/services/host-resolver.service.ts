import { Injectable } from '@angular/core';

@Injectable()
export class HostResolverService {

  private hostMap: Map<string, string>;

  constructor() {
    this.hostMap = new Map<string, string>();

    this.hostMap.set('core-01', '172.17.8.101');
    this.hostMap.set('core-02', '172.17.8.102');
    this.hostMap.set('core-03', '172.17.8.103');
  }

  getHostAddress(name: string) {
    return 'tcp://' + this.hostMap.get(name) + ':2375';
  }

}
