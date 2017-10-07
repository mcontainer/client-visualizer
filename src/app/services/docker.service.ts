import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NodeInformation } from '../models/node-information';
import { Observable } from 'rxjs/Observable';
import { ContainerInformation } from '../models/container-information';
import { HostResolverService } from './host-resolver.service';

@Injectable()
export class DockerService {

  constructor(private http: HttpClient, private hostResolver: HostResolverService) {
  }

  openContainerLogsStream(containerInfo: NodeInformation): Observable<NodeInformation> {
    const containerInfoApi = new ContainerInformation(containerInfo);
    containerInfoApi.host = this.hostResolver.getHostAddress(containerInfoApi.host);

    return this.http.post('http://172.17.8.103:8090/', containerInfoApi, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

}
