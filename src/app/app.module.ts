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
import {
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdProgressBarModule,
  MdSidenavModule,
  MdSnackBarModule,
  MdToolbarModule,
} from '@angular/material';
import { SseService } from './services/sse.service';
import { InfoComponent } from './info/info.component';
import { StateService } from './services/state.service';
import { NodeInfoComponent } from './info/node-info/node-info.component';
import { DockerService } from './services/docker.service';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    GraphContainerComponent,
    ToolbarComponent,
    InfoComponent,
    NodeInfoComponent,
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
    MdProgressBarModule,
    MdButtonModule,
    MdIconModule,
    FlexLayoutModule,
  ],
  providers: [D3Service, DGraphService, SseService, StateService, DockerService,],
  bootstrap: [AppComponent,]
})
export class AppModule {
}
