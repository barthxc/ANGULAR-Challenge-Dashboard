import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserByIdPageComponent } from './user-by-id-page.component';

describe('UserByIdPageComponent', () => {
  let component: UserByIdPageComponent;
  let fixture: ComponentFixture<UserByIdPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserByIdPageComponent]
    });
    fixture = TestBed.createComponent(UserByIdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
