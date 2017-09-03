import { Component, OnInit } from '@angular/core';
import {StateService} from '../services/state.service';
import { Node } from '../d3/models';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  info: Node;
  size: number;

  constructor(private stateService: StateService) { }

  ngOnInit() {

    this.stateService.store$.subscribe(state => {
      const { info, clusterSize } = state;
      this.info = info;
      this.size = clusterSize;
    });

  }

}
