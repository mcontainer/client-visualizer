import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { Node } from '../d3/models';

@Component({
  selector: 'app-node-information-container',
  templateUrl: './node-information-container.component.html',
  styleUrls: ['./node-information-container.component.css']
})
export class NodeInformationContainerComponent implements OnInit {

  info: Node;

  constructor(private stateService: StateService) {
  }

  ngOnInit() {
    this.stateService.store$.subscribe(state => {
      const {info} = state;
      this.info = info;
    });

  }
}
