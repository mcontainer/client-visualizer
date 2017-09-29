import {EventEmitter, Injectable} from '@angular/core';
import {ForceDirectedGraph, Link, Node} from './';
import * as d3 from 'd3';
import {StateService} from '../services/state.service';

@Injectable()
export class D3Service {

  static ui$: EventEmitter<any> = new EventEmitter();

  /** The interactable graph we will simulate in this article
   * This method does not interact with the document, purely physical calculations with d3
   */
  static getForceDirectedGraph(nodes: Node[], links: Link[], options: { width, height }) {
    return new ForceDirectedGraph(nodes, links, options, D3Service.ui$);
  }


  /** This service will provide methods to enable user interaction with elements
   * while maintaining the d3 simulations physics
   */
  constructor(private stateService: StateService) {
  }

  /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour(svgElement, containerElement) {
    const svg = d3.select(svgElement);
    const container = d3.select(containerElement);

    const zoomed = () => {
      const transform = d3.event.transform;
      container.attr('transform', 'translate(' + transform.x + ',' + transform.y + ') scale(' + transform.k + ')');
    };

    const zoom = d3.zoom().on('zoom', zoomed);
    svg.call(zoom);
  }

  applyOnClickBehavior(element, node: Node) {
    const d3element = d3.select(element);
    d3element.on('click', _ => {
      if (d3.event.ctrlKey) {
        this.stateService.dispatch('GROUP_ADD', node.service);
      } else {
        this.stateService.dispatch('OPEN', true);
        this.stateService.dispatch('INFO', node);
      }
    })
  }

  applyOnMouseBehavior(element, node: Node) {
    const d3element = d3.select(element);
    d3element.on('mouseover', _ => {
      D3Service.ui$.emit({action: 'on', data: node});
    });

    d3element.on('mouseout', _ => {
      D3Service.ui$.emit({action: 'off'});
    });
  }

  /** A method to bind a draggable behaviour to an svg element */
  applyDraggableBehaviour(element, node: Node, graph: ForceDirectedGraph) {
    const d3element = d3.select(element);

    function started() {
      if (!d3.event.active) {
        graph.simulation.alphaTarget(0.3).restart();
      }

      d3.event.on('drag', dragged).on('end', ended);

      function dragged() {
        node.fx = d3.event.x;
        node.fy = d3.event.y;
      }

      function ended() {
        if (!d3.event.active) {
          graph.simulation.alphaTarget(0);
        }

        node.fx = null;
        node.fy = null;
      }
    }

    d3element.call(d3.drag().on('start', started));
  }
}
