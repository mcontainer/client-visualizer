import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { NodeInformation } from '../../models/node-information';
import { DockerService } from '../../services/docker.service';
import { SseService } from '../../services/sse.service';
import { MdSnackBar } from '@angular/material';
import { Node } from '../../d3/models';
import { LogMessage } from '../../models/log-message';
import { Observable } from 'rxjs/Observable';
import { HostResolverService } from '../../services/host-resolver.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-node-logs-container',
  templateUrl: './node-logs-container.component.html',
  styleUrls: ['./node-logs-container.component.css']
})
export class NodeLogsContainerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() info: Node;
  resolvedHost: string;
  logs: Array<LogMessage> = [{'message': 'No logs.', isErrorMessage: true}];
  @ViewChild('logContainer') private logContainer: ElementRef;
  private source: Observable<LogMessage>;
  private autoscroll = false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private dockerService: DockerService,
              private sseService: SseService,
              private snackBar: MdSnackBar,
              private hostResolver: HostResolverService) {
  }

  emitLogRequest() {
    this.dockerService.openContainerLogsStream(this.info as NodeInformation)
      .subscribe(
        response => this.snackBar.open('[INFO] Logs stream initiated', 'CLOSE', {
          duration: 1500
        }),
        err => {
          console.log(err);
          this.snackBar.open('[ERROR] Error during stream opening', 'CLOSE', {
            duration: 3000
          });
        }
      );
  }

  toggleAutoscroll() {
    this.autoscroll = !this.autoscroll;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngUnsubscribe.next();
    const info: SimpleChange = changes.info;
    this.info = info.currentValue;
    this.resolvedHost = this.hostResolver.getHostAddress(this.info.host);
    this.logs = [];
    this.source = this.sseService.createSSE('http://172.17.8.103:12345/logs' +
      '?containerId=' + this.info.containerID +
      '&host=' + this.resolvedHost
    );

    this.emitLogRequest();

    this.source
      .takeUntil(this.ngUnsubscribe)
      .subscribe(logLine => {
        if (this.logs.length > 100) {
          // TODO(archangelx360): use observable mecanism instead of this ugly HOTFIX
          this.logs.shift();
        }
        this.logs.push(logLine);
        if (this.autoscroll) {
          // TODO(archangelx360): enhance performance here, scrolling each line could be a bit hardcore
          this.scrollLogsToBottom();
        }
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private scrollLogsToBottom(): void {
    try {
      this.logContainer.nativeElement.scrollTop = this.logContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

}
