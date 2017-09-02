import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {D3Service} from '../d3.service';
import { Node } from '../models'
import {ForceDirectedGraph} from '../models/force-directed-graph';

@Directive({
  selector: '[appClick]'
})
export class ClickDirective implements OnInit {

  @Input() node: Node;
  @Input() graph: ForceDirectedGraph;

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngOnInit(): void {
    this.d3Service.applyOnClickBehavior(this._element.nativeElement, this.node);
  }

}
