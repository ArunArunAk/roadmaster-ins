import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardSliderComponent } from './post-card-slider.component';

describe('PostCardSliderComponent', () => {
  let component: PostCardSliderComponent;
  let fixture: ComponentFixture<PostCardSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostCardSliderComponent]
    });
    fixture = TestBed.createComponent(PostCardSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
