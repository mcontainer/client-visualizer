import {EventEmitter} from '@angular/core';
import {Link, Node} from './';
import * as d3 from 'd3';

const FORCES = {
  LINKS: 1 / 50,
  COLLISION: 1,
  CHARGE: -50
};

export class ForceDirectedGraph {
  public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
  public simulation: d3.Simulation<any, any>;
  public fill: d3.ScaleOrdinal<string, string> = d3.scaleOrdinal(d3.schemeCategory20);
  public nodes: Node[] = [];
  public links: Link[] = [];
  private nodeset: Set<string> = new Set();
  private linkset: Set<string> = new Set();
  private groupNode: Map<String, Node[]> = new Map();
  private groupLink: Map<number | Node | string, Link[]> = new Map();
  private isGrouped: Set<String> = new Set();
  private ui$: EventEmitter<any>;

  constructor(nodes, links, options: { width, height }, uiStream: EventEmitter<any>) {
    this.nodes = nodes;
    this.links = links;
    this.ui$ = uiStream;
    this.initSimulation(options);
  }

  connectNodes(link: Link) {
    const source = <string>link.source;
    const target = <string>link.target;
    const data = [source, target];
    data.sort();
    const index = data[0] + '-' + data[1];
    if (!this.linkset.has(index)) {
      if (!this.groupLink.has(index)) {
        this.groupLink.set(index, []);
      }
      this.groupLink.get(index).push(link);
      this.links.push(link);
      this.linkset.add(index);
      this.simulation.alphaTarget(0.3).restart();
      this.initLinks();
    }
  }

  removeNode(id: string): void {
    const index = this.simulation.nodes().map(node => node.containerID).indexOf(id);
    if (index > -1) {
      const node = this.simulation.nodes()[index];
      this.nodeset.delete(id);
      this.removeLink(id);
      const array = this.groupNode.get(node.service).filter(n => n.containerID === id);
      this.groupNode.set(node.service, array);
      this.simulation.nodes().splice(index, 1);
      this.simulation.restart();
    }
  }

  private findConnection(id: string): Link[] {
    return this
      .links
      .filter(l => (<Node>l.target).containerID === id || (<Node>l.source).containerID === id);
  }

  private removeLink(id: string) {
    const filtered = this.findConnection(id);
    filtered.forEach(link => {
      const index = this.links.indexOf(link);
      if (index > -1) {
        const data = [(<Node>link.target).containerID, (<Node>link.source).containerID];
        data.sort();
        const key = data[0] + '-' + data[1];
        this.linkset.delete(key);
        this.links.splice(index, 1);
      }
    });
    this.simulation.alphaTarget(0.1).restart();
  }

  addNode(n: Node): void {
    if (!this.exist(n.id)) {
      n.color = this.fill(n.service);
      this.nodes.push(n);
      this.nodeset.add(n.id);
      if (!this.groupNode.has(n.service)) {
        this.groupNode.set(n.service, []);
      }
      this.groupNode.get(n.service).push(n);
      this.simulation.nodes(this.nodes);
      this.simulation.restart();
    }
  }

  private findLinks(nodes: Node[]): string {
    console.log(this.groupLink)
    for (let i = 0; i < nodes.length; ++i) {
      for (let j = 1; j < nodes.length; ++j) {
        const s = nodes[i].id;
        const d = nodes[j].id;
        const data = [s, d];
        data.sort();
        const index = data[0] + '-' + data[1];
        console.log(index)
        if (this.groupLink.has(index)) {
          return index;
        }
      }
    }
  }


  collapse(key: string) {
    const nodes = this.groupNode.get(key);
    if (!this.isGrouped.has(key)) {
      const oldN = nodes[0];
      console.log(this.findLinks(nodes))
      nodes.forEach(n => {
        console.log(this.groupLink.get(n.id));
        this.removeNode(n.containerID)
      });
      this.addNode(new Node(oldN.id, 'GROUP', oldN.containerID, 'test net', oldN.service, 'h', 'test'));
      this.isGrouped.add(key);
    } else {
      this.isGrouped.delete(key);
      this.removeNode(nodes[0].containerID);
      // nodes.forEach(node => this.addNode(node));
      // nodes.forEach(node => {
      //   this.groupLink.get(node.id).forEach(link => this.connectNodes(link));
      // });
    }
  }

  exist(id: string): boolean {
    return this.nodeset.has(id);
  }

  initNodes() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.nodes.forEach(node => node.color = this.fill(node.service));

    this.simulation.nodes(this.nodes);
  }

  initLinks() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }
    this.simulation.force('links',
      d3.forceLink(this.links)
        .id(d => d['id'])
        .strength(FORCES.LINKS)
    );
  }

  initSimulation(options) {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }

    /** Creating the simulation */
    if (!this.simulation) {
      const ticker = this.ticker;

      this.simulation = d3.forceSimulation()
        .force(
          'charge',
          d3.forceManyBody().strength(-600)
          // d3.forceManyBody().strength(d => FORCES.CHARGE * d['r'])
        )
        .force(
          'collide',
          d3.forceCollide().strength(FORCES.COLLISION).radius(d => d['r'] + 5).iterations(2)
        );
      // Connecting the d3 ticker to an angular event emitter
      this.simulation.on('tick', function () {
        ticker.emit(this);
      });

      this.initNodes();
      this.initLinks();

      this.ui$.subscribe(payload => {
        const {action, data} = payload;
        if (action === 'on') {
          const nodesid = new Set();
          this.links.forEach((l: any) => {
            if (l.target.id === data.id || l.source.id === data.id) {
              l.strokeWidth = 6;
              nodesid.add(l.target.id);
              nodesid.add(l.source.id);
            }
          });
          this.nodes.forEach(n => {
            if (nodesid.has(n.id)) {
              n.strokeWidth = 6;
            }
          });
        } else {
          this.links.forEach(l => l.strokeWidth = 2);
          this.nodes.forEach(n => n.strokeWidth = 2);
        }
        this.simulation.alphaTarget(0.1).restart();
      });

    }

    /** Updating the central force of the simulation */
    this.simulation.force('centers', d3.forceCenter(options.width / 2, options.height / 2));

    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }
}
