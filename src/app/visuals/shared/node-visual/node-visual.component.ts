import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../../../d3';

@Component({
  selector: '[node]',
  template: `
    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
      <svg:circle
          class="node"
          [attr.fill]="node.color"
          cx="0"
          cy="0"
          [attr.r]="node.r">
      </svg:circle>
      <svg:text
          class="node-name"
          [attr.font-size]="node.fontSize">
        {{node.id}} - {{node.name}}
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent implements OnInit{
  @Input('node') node: Node;

  ngOnInit(): void {
  }
}
