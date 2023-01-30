import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSpaceOperatorPopupComponent } from './new-space-operator-popup.component';

describe('NewSpaceOperatorPopupComponent', () => {
  let component: NewSpaceOperatorPopupComponent;
  let fixture: ComponentFixture<NewSpaceOperatorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSpaceOperatorPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSpaceOperatorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
