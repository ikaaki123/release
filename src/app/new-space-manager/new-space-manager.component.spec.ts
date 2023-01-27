import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSpaceManagerComponent } from './new-space-manager.component';

describe('NewSpaceManagerComponent', () => {
  let component: NewSpaceManagerComponent;
  let fixture: ComponentFixture<NewSpaceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSpaceManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSpaceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
