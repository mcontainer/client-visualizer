import { Component, OnInit } from '@angular/core';
import {StateService} from '../services/state.service';
import { Node } from '../d3/models';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  info: Node;

  constructor(private stateService: StateService) { }

  ngOnInit() {

    this.info = this.stateService.initial.info;

    this.stateService.store$.subscribe(state => {
      const { info } = state;
      this.info = info;
    });

  }

}
