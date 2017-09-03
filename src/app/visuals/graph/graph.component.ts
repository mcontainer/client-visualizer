import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnInit
} from '@angular/core';
import { D3Service, ForceDirectedGraph, Node, Link } from '../../d3';
import * as Rx from 'rxjs/Rx';

@Component({
  selector: 'app-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
      <g [zoomableOf]="svg">
        <g [link]="link" *ngFor="let link of links"></g>
        <g [node]="node" *ngFor="let node of nodes"
           [draggableNode]="node" [draggableInGraph]="graph"
           appClick [node]="node"
        ></g>
      </g>
    </svg>
  `,
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {
  @Input('nodes') nodes;
  @Input('links') links;
  @Input('node$') node$: Rx.Observable<[Node[], Link[]]>;

  graph: ForceDirectedGraph;
  _options: { width, height } = {width: 800, height: 600};

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }

  constructor(private d3Service: D3Service, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */
    this.graph = D3Service.getForceDirectedGraph(this.nodes, this.links, this.options);
    this
      .node$
      .subscribe(([nodes, links]) => {
      nodes.forEach(node => this.graph.addNode(node));
      links.forEach(link => this.graph.connectNodes(link));
    });

    /** Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  get options() {
    return this._options = {
      // FIXME: hardcoded reduction
      width: window.innerWidth - 250 - 16,
      height: window.innerHeight - 70
    };
  }
}
