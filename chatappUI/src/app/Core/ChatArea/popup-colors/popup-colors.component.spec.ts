import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupColorsComponent } from './popup-colors.component';

describe('PopupColorsComponent', () => {
  let component: PopupColorsComponent;
  let fixture: ComponentFixture<PopupColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupColorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
