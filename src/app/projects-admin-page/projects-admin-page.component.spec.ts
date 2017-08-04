import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAdminPageComponent } from './projects-admin-page.component';

describe('ProjectsAdminPageComponent', () => {
  let component: ProjectsAdminPageComponent;
  let fixture: ComponentFixture<ProjectsAdminPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsAdminPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
