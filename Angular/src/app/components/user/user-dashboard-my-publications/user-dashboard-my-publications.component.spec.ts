import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardMyPublicationsComponent } from './user-dashboard-my-publications.component';

describe('UserDashboardMyPublicationsComponent', () => {
  let component: UserDashboardMyPublicationsComponent;
  let fixture: ComponentFixture<UserDashboardMyPublicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardMyPublicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardMyPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
