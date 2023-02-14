import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishBoxComponent } from './finish-box.component';

describe('FinishBoxComponent', () => {
  let component: FinishBoxComponent;
  let fixture: ComponentFixture<FinishBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
