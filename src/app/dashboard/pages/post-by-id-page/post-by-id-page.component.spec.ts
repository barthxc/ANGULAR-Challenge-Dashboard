import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostByIdPageComponent } from './post-by-id-page.component';

describe('PostByIdPageComponent', () => {
  let component: PostByIdPageComponent;
  let fixture: ComponentFixture<PostByIdPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostByIdPageComponent]
    });
    fixture = TestBed.createComponent(PostByIdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
