import { NodeInformation } from '../../models/node-information';

export class Node extends NodeInformation implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  linkCount = 0;
  strokeWidth = 2;
  private _color: string;

  constructor(id: string, name: string, containerID: string, network: string, service: string, host: string, ip: string) {
    super(id, name, containerID, network, service, host, ip)
  }

  normal = () => {
    return 1;
    /*return Math.sqrt(this.linkCount / APP_CONFIG.N);*/
  };

  get r() {
    return 30 * this.normal() + 10;
  }

  get fontSize() {
    return 10 + 'px';
  }

  get color(): string {
    // const index = Math.floor(APP_CONFIG.SPECTRUM.length * this.normal());
    // return APP_CONFIG.SPECTRUM[index];
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

}
