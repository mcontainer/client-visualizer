import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeLogsContainerComponent } from './node-logs-container.component';

describe('NodeLogsContainerComponent', () => {
  let component: NodeLogsContainerComponent;
  let fixture: ComponentFixture<NodeLogsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NodeLogsContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeLogsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
