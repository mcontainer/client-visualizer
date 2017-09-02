import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { D3Service, ForceDirectedGraph, Node } from '../';

@Directive({
  selector: '[draggableNode]'
})
export class DraggableDirective implements OnInit {
  @Input('draggableNode') node: Node;
  @Input('draggableInGraph') graph: ForceDirectedGraph;

  constructor(private d3Service: D3Service, private _element: ElementRef) {
  }

  ngOnInit() {
    this.d3Service.applyDraggableBehaviour(this._element.nativeElement, this.node, this.graph);
  }
}
