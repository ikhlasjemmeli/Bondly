import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEmojiComponent } from './popup-emoji.component';

describe('PopupEmojiComponent', () => {
  let component: PopupEmojiComponent;
  let fixture: ComponentFixture<PopupEmojiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupEmojiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
