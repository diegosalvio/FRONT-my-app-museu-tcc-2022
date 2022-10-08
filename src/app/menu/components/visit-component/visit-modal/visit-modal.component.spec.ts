import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitModalComponent } from './visit-modal.component';

describe('VisitModalComponent', () => {
  let component: VisitModalComponent;
  let fixture: ComponentFixture<VisitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
