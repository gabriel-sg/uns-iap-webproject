import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardMessagesComponent } from './user-dashboard-messages.component';

describe('UserDashboardMessagesComponent', () => {
  let component: UserDashboardMessagesComponent;
  let fixture: ComponentFixture<UserDashboardMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
