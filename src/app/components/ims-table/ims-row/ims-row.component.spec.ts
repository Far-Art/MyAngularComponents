import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsRowComponent } from './ims-row.component';

describe('ImsRowComponent', () => {
  let component: ImsRowComponent;
  let fixture: ComponentFixture<ImsRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImsRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
