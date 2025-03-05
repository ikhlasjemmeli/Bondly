import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNamesComponent } from './popup-names.component';

describe('PopupNamesComponent', () => {
  let component: PopupNamesComponent;
  let fixture: ComponentFixture<PopupNamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupNamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
