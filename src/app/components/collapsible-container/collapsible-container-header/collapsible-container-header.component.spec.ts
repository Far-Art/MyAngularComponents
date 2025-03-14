import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleContainerHeaderComponent } from './collapsible-container-header.component';

describe('CollapsibleContainerHeaderComponent', () => {
  let component: CollapsibleContainerHeaderComponent;
  let fixture: ComponentFixture<CollapsibleContainerHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollapsibleContainerHeaderComponent]
    });
    fixture = TestBed.createComponent(CollapsibleContainerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
