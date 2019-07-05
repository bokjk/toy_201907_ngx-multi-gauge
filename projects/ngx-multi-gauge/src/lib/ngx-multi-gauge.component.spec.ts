import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMultiGaugeComponent } from './ngx-multi-gauge.component';

describe('NgxMultiGaugeComponent', () => {
  let component: NgxMultiGaugeComponent;
  let fixture: ComponentFixture<NgxMultiGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMultiGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMultiGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
