import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArtifactComponent } from './new-artifact.component';

describe('NewArtifactComponent', () => {
  let component: NewArtifactComponent;
  let fixture: ComponentFixture<NewArtifactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewArtifactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewArtifactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
