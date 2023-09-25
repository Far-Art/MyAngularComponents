import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {WindowRefService} from "../../window-ref.service";

@Component({
  selector: 'app-draggable-table',
  templateUrl: './draggable-table.component.html',
  styleUrls: ['./draggable-table.component.scss']
})
export class DraggableTableComponent implements OnInit {

  // TODO rewrite global pointer functions, now the work twice

  content: any[];

  tempContent: any[];

  draggingContent: any[];

  isHolding = false;

  mouse: { moveX: number, moveY: number } = {moveX: 0, moveY: 0};

  clickLocation: { mouseX: number, mouseY: number } = {mouseX: 0, mouseY: 0};

  private addGlobalPointerListener = (event: MouseEvent, elem: any) => this.windowRef?.windowObject?.addEventListener("pointerup", () => this.dropElement(event, elem));

  private removeGlobalPointerListener = (event: MouseEvent, elem: any) => this.windowRef?.windowObject?.removeEventListener("pointerup", () => this.dropElement(event, elem));


  constructor(private windowRef: WindowRefService) {
    this.content = ["111", "222", "333", "444", "555"];
    this.draggingContent = [];
    this.tempContent = [...this.content];
  }

  ngOnInit(): void {
  }

  public clickOnElement(event: MouseEvent, elem: any) {
    this.addGlobalPointerListener(event, elem);
    this.isHolding = true;
    this.clickLocation = {mouseX: Math.floor(event.x), mouseY: Math.floor(event.y)}
  }

  public dropElement(event: MouseEvent, elem: any) {
    this.isHolding = false;
    this.removeGlobalPointerListener(event, elem);
    this.removeElementFromDragging(elem);
    console.log(this.draggingContent);
  }

  public draggingEvent(event: MouseEvent) {
    let target: HTMLTableRowElement = event.composedPath()[1] as HTMLTableRowElement;
    const rect = target.getBoundingClientRect()
    this.calcMouseRelativePosition(event, rect);
    if (this.isHolding) {
      // target.style.transform = `translate3d(${this.mouse.moveX}px, ${this.mouse.moveY}px, 0)`;
      target.style.left = `${this.mouse.moveX}px`;
      target.style.top = `${this.mouse.moveY}px`;
    }
  }

  public calcMouseRelativePosition(event: MouseEvent, rect: DOMRect) {
    this.mouse.moveX = Math.floor(event.x - this.clickLocation.mouseX);
    this.mouse.moveY = Math.floor(event.y - this.clickLocation.mouseY);
  }


  public addElementToDragging(elem: any) {
    this.draggingContent.push(elem);
  }

  private removeElementFromDragging(elem: any) {
    this.draggingContent = this.draggingContent.filter(e => e !== elem);
  }

  public swapElements(element: string) {
    console.log(element);
  }

}
