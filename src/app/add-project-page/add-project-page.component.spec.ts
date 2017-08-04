import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectPageComponent } from './add-project-page.component';

describe('AddProjectPageComponent', () => {
  let component: AddProjectPageComponent;
  let fixture: ComponentFixture<AddProjectPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
