import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsTableComponent } from './ims-table.component';

describe('ImsTableComponent', () => {
  let component: ImsTableComponent;
  let fixture: ComponentFixture<ImsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
