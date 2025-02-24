import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentByIdPageComponent } from './comment-by-id-page.component';

describe('CommentByIdPageComponent', () => {
  let component: CommentByIdPageComponent;
  let fixture: ComponentFixture<CommentByIdPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentByIdPageComponent]
    });
    fixture = TestBed.createComponent(CommentByIdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
