import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnInit
} from '@angular/core';
import { D3Service, ForceDirectedGraph, Link, Node } from '../../d3';
import * as Rx from 'rxjs/Rx';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
      <g [zoomableOf]="svg">
        <g [link]="link" *ngFor="let link of links"></g>
        <g [node]="node" *ngFor="let node of nodes"
           [draggableNode]="node"
           [draggableInGraph]="graph"
           appClick [node]="node"
           appHover [node]="node"
        ></g>
      </g>
    </svg>
  `,
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {
  @Input('nodes') nodes;
  @Input('links') links;
  @Input('nodeLink$') nodeLink$: Rx.Observable<[Node[], Link[]]>;
  @Input('node$') node$: Rx.Observable<Node>;
  @Input('link$') link$: Rx.Observable<Link>;
  @Input('del$') del$: Rx.Observable<string>;

  isGrouped = false;

  graph: ForceDirectedGraph;
  _options: { width, height } = {width: 800, height: 600};

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }

  constructor(private d3Service: D3Service, private ref: ChangeDetectorRef, private stateService: StateService) {
  }

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */
    this.graph = D3Service.getForceDirectedGraph(this.nodes, this.links, this.options);

    this.node$.subscribe(node => this.graph.addNode(node));

    this.link$.subscribe(link => this.graph.connectNodes(link));

    this
      .nodeLink$
      .subscribe(([nodes, links]) => {
        if (!this.isGrouped) {
          nodes.forEach(node => this.graph.addNode(node));
          links.forEach(link => this.graph.connectNodes(link));
        }
      });

    this
      .del$
      .subscribe(id => this.graph.removeNode(id));

    this
      .stateService
      .store$
      .subscribe(state => {
        const {group} = state;
        if (group !== '') {
          this.graph.collapse(group);
          this.isGrouped = !this.isGrouped;
          this.stateService.dispatchWithoutPayload('GROUP_DEL');
        }
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
      height: window.innerHeight - 70 - 470
    };
  }
}
