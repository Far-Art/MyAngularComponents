import {Component, OnInit} from '@angular/core';

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

  ngOnInit(): void {

  }

  public contentDragEvent(event: PointerEvent, content: string) {
    console.log(event, event.type);
    console.log("content", content);
  }

}
