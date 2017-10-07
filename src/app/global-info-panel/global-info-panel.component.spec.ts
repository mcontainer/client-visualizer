import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalInfoPanelComponent } from './global-info-panel.component';

describe('GlobalInfoPanelComponent', () => {
  let component: GlobalInfoPanelComponent;
  let fixture: ComponentFixture<GlobalInfoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalInfoPanelComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
