import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardEditRequestComponent } from './user-dashboard-edit-request.component';

describe('UserDashboardEditRequestComponent', () => {
  let component: UserDashboardEditRequestComponent;
  let fixture: ComponentFixture<UserDashboardEditRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardEditRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardEditRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
