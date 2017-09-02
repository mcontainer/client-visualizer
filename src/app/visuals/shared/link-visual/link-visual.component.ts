import { Component, Input, OnInit } from '@angular/core';
import { Link, Node } from '../../../d3';

@Component({
  selector: '[link]',
  template: `
    <svg:line
        class="link"
        [ngStyle]="{'stroke-width':link.strokeWidth}"
        [attr.x1]="source.x"
        [attr.y1]="source.y"
        [attr.x2]="target.x"
        [attr.y2]="target.y"
    ></svg:line>
  `,
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent implements OnInit {
  @Input('link') link: Link;

  source: Node;
  target: Node;

  ngOnInit(): void {
    this.source = this.link.source instanceof Node ? this.link.source : null;
    this.target = this.link.target instanceof Node ? this.link.target : null;
  }



}
