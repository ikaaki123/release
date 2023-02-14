import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPackageComponent } from './print-package.component';

describe('PrintPackageComponent', () => {
  let component: PrintPackageComponent;
  let fixture: ComponentFixture<PrintPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
