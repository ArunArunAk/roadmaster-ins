import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentListsComponent } from './comment-lists.component';

describe('CommentListsComponent', () => {
  let component: CommentListsComponent;
  let fixture: ComponentFixture<CommentListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentListsComponent]
    });
    fixture = TestBed.createComponent(CommentListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
