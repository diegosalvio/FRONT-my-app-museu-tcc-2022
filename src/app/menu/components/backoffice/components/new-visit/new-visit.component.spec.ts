import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVisitComponent } from './new-visit.component';

describe('NewVisitComponent', () => {
  let component: NewVisitComponent;
  let fixture: ComponentFixture<NewVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
