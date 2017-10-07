import { NodeInformation } from './node-information';

/**
 * API definition of container information (proto)
 */
export class ContainerInformation {
  id: string; // containerId
  network: string;
  service: string;
  host: string;
  name: string;
  ip: string;

  constructor(nodeInformation: NodeInformation) {
    this.id = nodeInformation.containerID;
    this.name = nodeInformation.name;
    this.network = nodeInformation.network;
    this.service = nodeInformation.service;
    this.host = nodeInformation.host;
    this.ip = nodeInformation.ip;
  }
}
