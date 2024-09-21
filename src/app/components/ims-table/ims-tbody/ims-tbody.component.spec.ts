import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsTbodyComponent } from './ims-tbody.component';

describe('ImsBodyComponent', () => {
  let component: ImsTbodyComponent;
  let fixture: ComponentFixture<ImsTbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImsTbodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsTbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
