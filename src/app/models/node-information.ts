export class NodeInformation {
  id: string;
  containerID: string;
  network: string;
  service: string;
  host: string;
  name: string;
  ip: string;

  constructor(id: string, name: string, containerID: string, network: string, service: string, host: string, ip: string) {
    this.id = id;
    this.name = name;
    this.containerID = containerID;
    this.network = network;
    this.service = service;
    this.host = host;
    this.ip = ip;
  }
}
