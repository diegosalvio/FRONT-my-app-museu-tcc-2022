import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeVisitationComponent } from './free-visitation.component';

describe('FreeVisitationComponent', () => {
  let component: FreeVisitationComponent;
  let fixture: ComponentFixture<FreeVisitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeVisitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeVisitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
