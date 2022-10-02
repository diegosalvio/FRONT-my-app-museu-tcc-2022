import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperChooseRouteComponent } from './stepper-choose-route.component';

describe('StepperChooseRouteComponent', () => {
  let component: StepperChooseRouteComponent;
  let fixture: ComponentFixture<StepperChooseRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperChooseRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepperChooseRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
