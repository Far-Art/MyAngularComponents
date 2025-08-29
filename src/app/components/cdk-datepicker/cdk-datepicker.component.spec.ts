import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkDatepickerComponent } from './cdk-datepicker.component';

describe('CdkDatepickerComponent', () => {
  let component: CdkDatepickerComponent;
  let fixture: ComponentFixture<CdkDatepickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CdkDatepickerComponent]
    });
    fixture = TestBed.createComponent(CdkDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
