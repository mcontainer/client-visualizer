import { EventEmitter } from '@angular/core';
import { Link, Node } from './';
import * as d3 from 'd3';

const FORCES = {
  LINKS: 1 / 50,
  COLLISION: 1,
  CHARGE: -5
};

export class ForceDirectedGraph {
  public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
  public simulation: d3.Simulation<any, any>;
  public fill: d3.ScaleOrdinal<string, string> = d3.scaleOrdinal(d3.schemeCategory20);
  public nodes: Node[] = [];
  public links: Link[] = [];
  private nodeset: Set<number> = new Set();
  private linkset: Set<number> = new Set();

  constructor(nodes, links, options: { width, height }) {
    this.nodes = nodes;
    this.links = links;
    this.initSimulation(options);
  }

  connectNodes(link: Link) {
    if (!this.linkset.has(link.id)) {
      this.links.push(link);
      this.linkset.add(link.id);
      this.simulation.alphaTarget(0.3).restart();
      this.initLinks();
    }
  }

  removeNode(id: string): void {
    console.log(id);
    const index = this.simulation.nodes().map(node => node.containerID).indexOf(id);
    if (index > -1) {
      this.simulation.nodes().splice(index, 1);
      this.simulation.restart();
    }
  }

  addNode(n: Node): void {
    if (!this.exist(n.id)) {
      n.color = this.fill(n.service);
      this.nodes.push(n);
      this.nodeset.add(n.id);
      this.simulation.nodes(this.nodes);
      this.simulation.restart();
    }
  }

  exist(id: number): boolean {
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
          d3.forceManyBody().strength(d => FORCES.CHARGE * d['r'])
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
    }

    /** Updating the central force of the simulation */
    this.simulation.force('centers', d3.forceCenter(options.width / 2, options.height / 2));

    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }
}
