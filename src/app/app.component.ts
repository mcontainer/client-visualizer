import { Component, OnInit } from '@angular/core';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  isOpen: boolean;

  constructor(private stateService: StateService) {
  }

  ngOnInit(): void {
    this.isOpen = this.stateService.initial.isOpen;

    this.stateService.store$.subscribe(state => {
      this.isOpen = state.isOpen;
    });
  }

}
