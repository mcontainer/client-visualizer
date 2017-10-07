import { Component, ElementRef, OnInit } from '@angular/core';
import { Link, Node } from '../d3';
import { DGraphService } from '../services/dgraph.service';
import { SseService } from '../services/sse.service';
import * as Rx from 'rxjs/Rx';
import { MdSnackBar } from '@angular/material';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.css']
})
export class GraphContainerComponent implements OnInit {

  nodes: Node[] = [];
  links: Link[] = [];
  private nodeLinkStream: Rx.Subject<[Node[], Link[]]> = new Rx.Subject();
  private nodeStream: Rx.Subject<Node> = new Rx.Subject();
  private linkStream: Rx.Subject<Link> = new Rx.Subject();
  private delStream: Rx.Subject<string> = new Rx.Subject();
  nodeLink$: Rx.Observable<[Node[], Link[]]> = this.nodeLinkStream.asObservable();
  node$: Rx.Observable<Node> = this.nodeStream.asObservable();
  link$: Rx.Observable<Link> = this.linkStream.asObservable();
  del$: Rx.Observable<string> = this.delStream.asObservable();
  height: number;
  width: number;

  constructor(private dGraphService: DGraphService,
              private sseService: SseService,
              private snackbar: MdSnackBar,
              private stateService: StateService,
              el: ElementRef) {
    this.height = el.nativeElement.offsetHeight;
    this.width = el.nativeElement.offsetWidth;
  }

  ngOnInit() {
    // const dGraphResponse = this.dGraphService.getContent();
    // let i = -1;
    // const nodesTMP = dGraphResponse.data.expand.map(node => {
    //   ++i;
    //   return new Node(node._uid_, node.name, node._uid_ + '', 'test network', `test${i % 2 === 0 ? 0 : 1}`, 'host', 'ip test');
    // });
    //
    // const linksTMP = [];
    // dGraphResponse.data.expand.forEach(node => {
    //   if (node['connected']) {
    //     node['connected'].forEach(connectedNode => {
    //       linksTMP.push(new Link(node._uid_, connectedNode._uid_, 3))
    //     });
    //   }
    // });
    //
    // setTimeout(() => {
    //   this.nodeLinkStream.next([nodesTMP, linksTMP]);
    // }, 1000);


    this
      .dGraphService
      .getTopology('microservice')
      .subscribe(data => {
        data.forEach(node => {
          this.nodeStream.next(new Node(node.Id, node.Name, node.Id, node.Network, node.Service, node.Host, node.Ip))
          this.stateService.dispatchWithoutPayload('INCREMENT_SIZE');
        });
        data
          .filter(node => node['Connected'] !== null)
          .map(node => node['Connected'].map(n => new Link(node.Id, n.Id)))
          .map(links => [].concat.apply([], links))
          .forEach(links => links.forEach(link => this.linkStream.next(link)));
      });

    const source = this.sseService.createSSE('http://172.17.8.103:1234/streaming');


    source
      .filter(graph => graph.action === 'DELETE')
      .map(graph => graph.payload.id)
      .do(() => this.stateService.dispatchWithoutPayload('DECREMENT_SIZE'))
      .subscribe(x => this.delStream.next(x));

    source
      .filter(graph => graph.action === 'ADD')
      .map(data => {
        const node = data.payload;
        return new Node(node.id, node.name, node.id, node.network, node.service, node.host, node.ip)
      })
      .do(() => this.stateService.dispatchWithoutPayload('INCREMENT_SIZE'))
      .subscribe(node => this.nodeStream.next(node));

    source
      .filter(g => g.action === 'CONNECT')
      .map(data => {
        const link = data.payload;
        return new Link(link.source, link.destination);
      })
      .subscribe(link => this.linkStream.next(link));


    // source
    //   .filter(graph => graph.action === 'NONE')
    //   .map(graph => {
    //     const nodes = graph.payload.map(node => new Node(node.Id, node.Name, node.Id, node.Network, node.Service, node.Host, node.Ip));
    //     const links = graph.payload
    //       .filter(node => node['Connected'] !== null)
    //       .map(node => node['Connected'].map(n => new Link(node.Id, n.Id, 1)));
    //     return [nodes, [].concat.apply([], links)];
    //   })
    //   .do(data => this.stateService.dispatch('SIZE', data[0].length))
    //   .subscribe(
    //     (data: [Node[], Link[]]) => this.nodeLinkStream.next(data),
    //     () => {
    //       this.snackbar.open('Unable to connect to the streaming endpoint', 'Close', {
    //         duration: 2000,
    //       });
    //     }
    //   );
  }

}
