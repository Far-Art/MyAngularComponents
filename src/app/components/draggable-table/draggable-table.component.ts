import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-draggable-table',
  templateUrl: './draggable-table.component.html',
  styleUrls: ['./draggable-table.component.scss']
})
export class DraggableTableComponent implements OnInit {

  constructor() {
    this.content = ["111", "222", "333", "444", "555"];
    this.toDragContent = [];
  }

  content: string[];

  toDragContent: string[];

  isInDragMode = false;

  mouseCoordinates: { mouseX: number, mouseY: number } = {mouseX: 0, mouseY: 0};

  ngOnInit(): void {

  }

  public startDrag() {
    this.isInDragMode = true;
  }

  public draggingEvent(event: MouseEvent) {
    const target: HTMLTableRowElement = <HTMLTableRowElement>event.target;

    if (this.isInDragMode) {
      console.log("x", event.x);
      console.log("y", event.y);
      // target.style.position = "relative";
      // target.style.transition = `all 1s linear`;
      this.mouseCoordinates.mouseX = event.x;
      this.mouseCoordinates.mouseY = event.y;

      target.style.left = `${this.mouseCoordinates.mouseX}px`;
      target.style.top = `${this.mouseCoordinates.mouseY}px`;

    }
  }

  public stopDrag() {
    this.isInDragMode = false;
  }

  public follow(event: MouseEvent) {
    const target = <HTMLTableRowElement>event.target;
    target.style.offset = `10px 20px`;
  }

}
