import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageItemsComponent } from './package-items.component';

describe('PackageItemsComponent', () => {
  let component: PackageItemsComponent;
  let fixture: ComponentFixture<PackageItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
