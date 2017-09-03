import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { D3Service } from './d3';

import { AppComponent } from './app.component';

import { GraphComponent } from './visuals/graph/graph.component';
import { D3_DIRECTIVES } from './d3/directives/index';
import { SHARED_VISUALS } from './visuals/shared/index';
import { DGraphService } from './services/dgraph.service';
import { GraphContainerComponent } from './graph-container/graph-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MdToolbarModule, MdSidenavModule, MdCardModule, MdSnackBarModule, MdProgressBarModule } from '@angular/material';
import {SseService} from './services/sse.service';
import { InfoComponent } from './info/info.component';
import {StateService} from './services/state.service';


@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    GraphContainerComponent,
    ToolbarComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdSidenavModule,
    MdCardModule,
    MdSnackBarModule,
    MdProgressBarModule
  ],
  providers: [D3Service, DGraphService, SseService, StateService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
