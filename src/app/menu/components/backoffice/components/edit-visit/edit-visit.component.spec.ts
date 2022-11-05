import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVisitComponent } from './edit-visit.component';

describe('EditVisitComponent', () => {
  let component: EditVisitComponent;
  let fixture: ComponentFixture<EditVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
