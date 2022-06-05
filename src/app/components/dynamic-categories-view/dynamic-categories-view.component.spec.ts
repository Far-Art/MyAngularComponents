import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCategoriesViewComponent } from './dynamic-categories-view.component';

describe('DynamicCategoriesViewComponent', () => {
  let component: DynamicCategoriesViewComponent;
  let fixture: ComponentFixture<DynamicCategoriesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicCategoriesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCategoriesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
