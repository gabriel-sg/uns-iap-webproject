import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardHelpComponent } from './user-dashboard-help.component';

describe('UserDashboardHelpComponent', () => {
  let component: UserDashboardHelpComponent;
  let fixture: ComponentFixture<UserDashboardHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
