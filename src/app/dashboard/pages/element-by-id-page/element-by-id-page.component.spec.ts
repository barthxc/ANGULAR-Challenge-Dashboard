import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementByIdPageComponent } from './element-by-id-page.component';

describe('ElementByIdPageComponent', () => {
  let component: ElementByIdPageComponent;
  let fixture: ComponentFixture<ElementByIdPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElementByIdPageComponent]
    });
    fixture = TestBed.createComponent(ElementByIdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
