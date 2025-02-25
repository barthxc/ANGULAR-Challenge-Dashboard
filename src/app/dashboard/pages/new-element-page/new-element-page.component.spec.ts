import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewElementPageComponent } from './new-element-page.component';

describe('NewElementPageComponent', () => {
  let component: NewElementPageComponent;
  let fixture: ComponentFixture<NewElementPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewElementPageComponent]
    });
    fixture = TestBed.createComponent(NewElementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
