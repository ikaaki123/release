import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSpaceOperatorComponent } from './new-space-operator.component';

describe('NewSpaceOperatorComponent', () => {
  let component: NewSpaceOperatorComponent;
  let fixture: ComponentFixture<NewSpaceOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSpaceOperatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSpaceOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
