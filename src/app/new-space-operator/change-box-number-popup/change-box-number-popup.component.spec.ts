import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBoxNumberPopupComponent } from './change-box-number-popup.component';

describe('ChangeBoxNumberPopupComponent', () => {
  let component: ChangeBoxNumberPopupComponent;
  let fixture: ComponentFixture<ChangeBoxNumberPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeBoxNumberPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBoxNumberPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
