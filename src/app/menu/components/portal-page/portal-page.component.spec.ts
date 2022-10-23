import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalPageComponent } from './portal-page.component';

describe('PortalPageComponent', () => {
  let component: PortalPageComponent;
  let fixture: ComponentFixture<PortalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
