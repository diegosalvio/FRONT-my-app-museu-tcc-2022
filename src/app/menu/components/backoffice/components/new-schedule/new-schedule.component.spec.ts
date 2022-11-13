import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewScheduleComponent } from './new-schedule.component';

describe('NewScheduleComponent', () => {
  let component: NewScheduleComponent;
  let fixture: ComponentFixture<NewScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
