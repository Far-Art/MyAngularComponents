import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsTheadComponent } from './ims-thead.component';

describe('ImsHeaderComponent', () => {
  let component: ImsTheadComponent;
  let fixture: ComponentFixture<ImsTheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImsTheadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsTheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
