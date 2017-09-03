import {Component, OnInit} from '@angular/core';
import {Link, Node} from '../d3';
import {DGraphService} from '../services/dgraph.service';
import {SseService} from '../services/sse.service';
import * as Rx from 'rxjs/Rx';
import {MdSnackBar} from '@angular/material';
import {StateService} from '../services/state.service';

@Component({
  selector: 'app-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.css']
})
export class GraphContainerComponent implements OnInit {

  nodes: Node[] = [];
  links: Link[] = [];
  private nodeStream: Rx.Subject<[Node[], Link[]]> = new Rx.Subject();
  node$: Rx.Observable<[Node[], Link[]]> = this.nodeStream.asObservable();

  constructor(private dGraphService: DGraphService,
              private sseService: SseService,
              private snackbar: MdSnackBar,
              private stateService: StateService
  ) {
    const dGraphResponse = dGraphService.getContent();

    dGraphResponse.data.expand.forEach(node => {
      this.nodes.push(new Node(node._uid_, node.name));
    });


    dGraphResponse.data.expand.forEach(node => {
      if (node['connected']) {
        node['connected'].forEach(connectedNode => {
          this.links.push(new Link(node._uid_, connectedNode._uid_, 3))
        });
      }
    });
  }

  ngOnInit() {

    const source = this.sseService.createSSE('http://localhost:1234/streaming');
    source
      .map(graph => {
        const nodes = graph.map(node => new Node(node.UID, node.Name));
        const links = graph
          .filter(node => node['Connected'] !== null)
          .map(node => node['Connected'].map(n => new Link(node.UID, n.UID, 3)));
        return [nodes, links[0]];
      })
      .do(data => this.stateService.dispatch('SIZE', data[0].length))
      .subscribe(
        (data: [Node[], Link[]]) => this.nodeStream.next(data),
        () => {
            this.snackbar.open('Unable to connect to the streaming endpoint', 'Close', {
              duration: 2000,
            });
        }
      );
  }

}
