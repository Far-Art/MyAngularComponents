import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleTableRowComponent } from './collapsible-table-row.component';

describe('CollapsibleTableRowComponent', () => {
  let component: CollapsibleTableRowComponent;
  let fixture: ComponentFixture<CollapsibleTableRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollapsibleTableRowComponent]
    });
    fixture = TestBed.createComponent(CollapsibleTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
