import { Component, Input, OnInit } from '@angular/core';
import { DockerService } from '../../services/docker.service';

@Component({
  selector: 'app-node-info',
  templateUrl: './node-info.component.html',
  styleUrls: ['./node-info.component.css']
})
export class NodeInfoComponent implements OnInit {

  @Input() info;

  emitDockerEvent(type: string) {
    // TODO: add containerId to info
    switch (type) {
      case "start":
        this.dockerService.startContainer(this.info.containerId);
        break;
        case "restart":
        this.dockerService.restartContainer(this.info.containerId);
        break;
        case "stop":
        this.dockerService.stopContainer(this.info.containerId);
        break;
    }
  }

  constructor(private dockerService: DockerService) { }

  ngOnInit() {
    this.info.started = true; // FIXME: remove this and use real container state
  }

}
