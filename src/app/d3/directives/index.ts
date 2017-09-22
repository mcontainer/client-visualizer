import { ZoomableDirective } from './zoomable.directive';
import { DraggableDirective } from './draggable.directive';
import {ClickDirective} from "./click.directive";
import {HoverDirective} from "./hover.directive";

export * from './zoomable.directive';
export * from './draggable.directive';
export * from './click.directive';
export * from './hover.directive';

export const D3_DIRECTIVES = [
  ZoomableDirective,
  DraggableDirective,
  ClickDirective,
  HoverDirective
];
