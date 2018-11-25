import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardConfigurationComponent } from './user-dashboard-configuration.component';

describe('UserDashboardConfigurationComponent', () => {
  let component: UserDashboardConfigurationComponent;
  let fixture: ComponentFixture<UserDashboardConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
