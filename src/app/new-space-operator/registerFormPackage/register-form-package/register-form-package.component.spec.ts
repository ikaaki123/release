import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormPackageComponent } from './register-form-package.component';

describe('RegisterFormPackageComponent', () => {
  let component: RegisterFormPackageComponent;
  let fixture: ComponentFixture<RegisterFormPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFormPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
