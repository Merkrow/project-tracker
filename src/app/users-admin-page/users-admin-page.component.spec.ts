import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAdminPageComponent } from './users-admin-page.component';

describe('UsersAdminPageComponent', () => {
  let component: UsersAdminPageComponent;
  let fixture: ComponentFixture<UsersAdminPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersAdminPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
