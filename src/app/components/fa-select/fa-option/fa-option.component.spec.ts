import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaOptionComponent } from './fa-option.component';

describe('FaOptionComponent', () => {
  let component: FaOptionComponent;
  let fixture: ComponentFixture<FaOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaOptionComponent]
    });
    fixture = TestBed.createComponent(FaOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
