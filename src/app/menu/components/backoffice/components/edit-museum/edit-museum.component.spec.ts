import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMuseumComponent } from './edit-museum.component';

describe('EditMuseumComponent', () => {
  let component: EditMuseumComponent;
  let fixture: ComponentFixture<EditMuseumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMuseumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMuseumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
