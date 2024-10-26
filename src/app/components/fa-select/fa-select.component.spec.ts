import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaSelectComponent } from './fa-select.component';

describe('FaSelectComponent', () => {
  let component: FaSelectComponent;
  let fixture: ComponentFixture<FaSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaSelectComponent]
    });
    fixture = TestBed.createComponent(FaSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
