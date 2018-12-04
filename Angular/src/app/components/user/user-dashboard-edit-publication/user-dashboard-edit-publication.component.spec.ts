import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardEditPublicationComponent } from './user-dashboard-edit-publication.component';

describe('UserDashboardEditPublicationComponent', () => {
  let component: UserDashboardEditPublicationComponent;
  let fixture: ComponentFixture<UserDashboardEditPublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardEditPublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardEditPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
