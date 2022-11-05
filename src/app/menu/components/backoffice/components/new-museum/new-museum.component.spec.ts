import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMuseumComponent } from './new-museum.component';

describe('NewMuseumComponent', () => {
  let component: NewMuseumComponent;
  let fixture: ComponentFixture<NewMuseumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMuseumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMuseumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
