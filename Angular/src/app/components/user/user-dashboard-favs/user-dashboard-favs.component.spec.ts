import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardFavsComponent } from './user-dashboard-favs.component';

describe('UserDashboardFavsComponent', () => {
  let component: UserDashboardFavsComponent;
  let fixture: ComponentFixture<UserDashboardFavsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardFavsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardFavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
