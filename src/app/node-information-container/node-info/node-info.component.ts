import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-node-info',
  templateUrl: './node-info.component.html',
  styleUrls: ['./node-info.component.css']
})
export class NodeInfoComponent implements OnInit {

  @Input() info;

  constructor() {
  }

  ngOnInit() {
  }

}
