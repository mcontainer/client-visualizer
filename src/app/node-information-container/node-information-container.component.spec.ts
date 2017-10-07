import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeInformationContainerComponent } from './node-information-container.component';

describe('NodeInformationContainerComponent', () => {
  let component: NodeInformationContainerComponent;
  let fixture: ComponentFixture<NodeInformationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NodeInformationContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeInformationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
