import { Injectable } from '@angular/core';

@Injectable()
export class DockerService {

  constructor() { }

  startContainer(containerId: string) {
    // TODO: emit event to server
    console.log("Starting container: " + containerId);
  }

  restartContainer(containerId: string) {
    // TODO: emit event to server
    console.log("Restarting container: " + containerId);
  }

  stopContainer(containerId: string) {
    // TODO: emit event to server
    console.log("Stopping container: " + containerId);
  }

}
