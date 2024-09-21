import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsThComponent } from './ims-th.component';

describe('ImsThComponent', () => {
  let component: ImsThComponent;
  let fixture: ComponentFixture<ImsThComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImsThComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsThComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
