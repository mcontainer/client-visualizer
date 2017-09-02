import {Component, OnInit} from '@angular/core';
import {Link, Node} from '../d3';
import {DGraphService} from '../services/dgraph.service';
import {SseService} from '../services/sse.service';
import * as Rx from 'rxjs/Rx';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.css']
})
export class GraphContainerComponent implements OnInit {

  nodes: Node[] = [];
  links: Link[] = [];
  private nodeStream: Rx.Subject<[Node, Node]> = new Rx.Subject();
  node$: Rx.Observable<[Node, Node]> = this.nodeStream.asObservable();

  constructor(private dGraphService: DGraphService, private sseService: SseService, private snackbar: MdSnackBar) {
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
    const dGraphResponse = this.dGraphService.getContent();
    source.subscribe(x => {
      const splitted = x.split('-');
      const [src, dst] = [...splitted];
      this.nodeStream.next([new Node(src, src), new Node(dst, dst)]);
    }, () => {
      this.snackbar.open('Unable to connect to the streaming endpoint', 'Close', {
        duration: 2000,
      });
    });

  }

}
