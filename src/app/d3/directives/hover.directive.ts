import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {D3Service} from '../d3.service';
import { Node } from '../models'

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements OnInit{

  @Input() node: Node;

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngOnInit(): void {
    this.d3Service.applyOnMouseBehavior(this._element.nativeElement, this.node);
  }

}
