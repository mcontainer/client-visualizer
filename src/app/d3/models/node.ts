import APP_CONFIG from '../../app.config';

export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  id: number;
  name: string;
  linkCount = 0;
  private _color: string;

  constructor(id: number, name) {
    this.id = id;
    this.name = name;
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
