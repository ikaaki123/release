import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDrawbackComponent } from './edit-drawback.component';

describe('EditDrawbackComponent', () => {
  let component: EditDrawbackComponent;
  let fixture: ComponentFixture<EditDrawbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDrawbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDrawbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
