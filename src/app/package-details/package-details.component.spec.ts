import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageDelailsComponent } from './package-details.component';

describe('PackageDelailsComponent', () => {
  let component: PackageDelailsComponent;
  let fixture: ComponentFixture<PackageDelailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageDelailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageDelailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
