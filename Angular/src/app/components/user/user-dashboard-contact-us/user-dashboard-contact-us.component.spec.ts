import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardContactUsComponent } from './user-dashboard-contact-us.component';

describe('UserDashboardContactUsComponent', () => {
  let component: UserDashboardContactUsComponent;
  let fixture: ComponentFixture<UserDashboardContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardContactUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
