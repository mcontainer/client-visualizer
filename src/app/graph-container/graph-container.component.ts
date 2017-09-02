import { Component, OnInit } from '@angular/core';
import { Link, Node } from '../d3';
import { DGraphService } from '../services/dgraph.service';
import {SseService} from "../services/sse.service";

@Component({
  selector: 'app-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.css']
})
export class GraphContainerComponent implements OnInit {

  nodes: Node[] = [];
  links: Link[] = [];

  constructor(private dGraphService: DGraphService, private sseService: SseService) {
    const dGraphResponse = dGraphService.getContent();

    dGraphResponse.data.expand.forEach(node => {
      this.nodes.push(new Node(node._uid_, node.name));
    });


    dGraphResponse.data.expand.forEach(node => {
      if (node['connected']) {
        node['connected'].forEach(connectedNode => {
          this.links.push(new Link(node._uid_, connectedNode._uid_, 5))
        });
      }
    });
  }

  ngOnInit() {

    const source = this.sseService.createSSE('http://localhost:1234/streaming');
    const dGraphResponse = this.dGraphService.getContent();
    source.subscribe(x => {
      // const split = x.split('-');
      // const [src, dst] = [split[0], split[1]]
      // this.nodes.push(new Node(src, "node 1"));
      // this.nodes.push(new Node(dst, "node 2"));
    });

  }

}
