import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsTdComponent } from './ims-td.component';

describe('ImsTdComponent', () => {
  let component: ImsTdComponent;
  let fixture: ComponentFixture<ImsTdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImsTdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
