import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardMyRequestsComponent } from './user-dashboard-my-requests.component';

describe('UserDashboardMyRequestsComponent', () => {
  let component: UserDashboardMyRequestsComponent;
  let fixture: ComponentFixture<UserDashboardMyRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardMyRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardMyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
