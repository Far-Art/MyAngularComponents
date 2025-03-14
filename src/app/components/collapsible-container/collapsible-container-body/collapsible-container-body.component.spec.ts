import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleContainerBodyComponent } from './collapsible-container-body.component';

describe('CollapsibleContainerBodyComponent', () => {
  let component: CollapsibleContainerBodyComponent;
  let fixture: ComponentFixture<CollapsibleContainerBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollapsibleContainerBodyComponent]
    });
    fixture = TestBed.createComponent(CollapsibleContainerBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
