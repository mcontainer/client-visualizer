import { Component, OnInit } from '@angular/core';
import {StateService} from '../services/state.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  isLoading = false;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.store$.subscribe(state => {
      const { isLoading } = state;
      this.isLoading = isLoading;
    });
  }

}
