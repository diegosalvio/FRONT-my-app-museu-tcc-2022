import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArtifactComponent } from './edit-artifact.component';

describe('EditArtifactComponent', () => {
  let component: EditArtifactComponent;
  let fixture: ComponentFixture<EditArtifactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditArtifactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditArtifactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
