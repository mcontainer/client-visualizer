import {Node} from './';

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  id: number;
  // must - defining enforced implementation properties
  source: Node | string | number;
  target: Node | string | number;
  strokeWidth: string | number;

  constructor(source: number, target: number, strokeWidth = 1) {
    this.source = source;
    this.target = target;
    this.strokeWidth = strokeWidth;
    this.id = this.generateId(source, target)
  }

  // pairing functions N x N -> N
  private generateId(a: number, b: number): number {
    return 1 / 2 * (a + b) * (a + b + 1) + b;
  }

}
