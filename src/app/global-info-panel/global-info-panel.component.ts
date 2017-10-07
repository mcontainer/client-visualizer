import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-global-info-panel',
  templateUrl: './global-info-panel.component.html',
  styleUrls: ['./global-info-panel.component.scss']
})
export class GlobalInfoPanelComponent implements OnInit {

  size: number;

  constructor(private stateService: StateService) { }

  ngOnInit() {

    this.stateService.store$.subscribe(state => {
      const {clusterSize} = state;
      this.size = clusterSize;
    });

  }

}
