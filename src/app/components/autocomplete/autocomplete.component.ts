import {Component, ElementRef, HostListener, Input, OnInit, QueryList, Renderer2, Self, ViewChild, ViewChildren} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';


@Component({
  selector: 'fa-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  animations: [
    trigger(
        'fadeInOut',
        [
          transition(
              ':enter',
              [
                style({
                  height: '0',
                  opacity: 0
                }),
                animate(280, style({
                  height: '*',
                  opacity: 1
                }))
              ]
          ),
          transition(
              ':leave',
              [
                style({
                  height: '*',
                  opacity: 1
                }),
                animate(280, style({
                  height: '0',
                  opacity: 0
                }))
              ]
          )
        ]
    )
  ]
})
export class AutocompleteComponent implements OnInit {

  @ViewChildren('autocompleteItem') autocompleteElementsList!: QueryList<ElementRef<HTMLParagraphElement>>;

  @ViewChild('inputElement', {static: true}) inputElement!: ElementRef<HTMLInputElement>;

  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  autocompleteList: string[] = [];
  filteredAutocomplete: string[] = [];

  @Input() placeholder: string | undefined;

  @Input() id!: string;

  showAutocomplete = false;

  value: string = '';

  selectedItemIndex = -1;
  selectedItemId: string | null = null;

  constructor(@Self() private elRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    for (let i = 0; i < 999999; i++) {
      this.autocompleteList.push('some data ' + i);
    }
    this.filteredAutocomplete = this.autocompleteList;
  }

  onItemClick(index: number) {
    this.value = this.filteredAutocomplete[index];
    this.showAutocomplete = false;
  }

  onInputFocus() {
    this.filterItems();
  }

  onInputBlur() {
    setTimeout(() => {
      // TODO check this
      if (!this.elRef.nativeElement.contains(document.activeElement)) {
        this.showAutocomplete = false;
      }
    });
  }

  onValueChange(event: Event) {
    this.value = (event.target as any).value;
    this.filterItems();
    this.markAsSelectedOptionItem(0);
  }

  markAsSelectedOptionItem(index: number, scroll: boolean = true) {
    setTimeout(() => {
      this.selectedItemIndex = this.filteredAutocomplete?.length ? index : -1;
      const el = this.autocompleteElementsList.get(index)?.nativeElement;
      this.selectedItemId = el?.id || null;

      if (scroll) {
        const viewportOffset = this.viewport.measureScrollOffset();
        const viewportSize = this.viewport.getViewportSize();
        const itemSize = this.autocompleteElementsList.first.nativeElement.getBoundingClientRect().height;

        const itemTopPosition = index * itemSize;
        const itemBottomPosition = itemTopPosition + itemSize;
        const totalVisibleItems = viewportSize / itemSize;

        // Check if the item is outside the visible area
        if (itemTopPosition < viewportOffset) {
          this.viewport.scrollToIndex(index, 'smooth');
        } else if (itemBottomPosition > (viewportOffset + viewportSize)) {
          this.viewport.scrollToIndex(index - Math.floor(totalVisibleItems) + 1, 'smooth');
        }
      }
    });
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (this.showAutocomplete && this.autocompleteElementsList?.length) {
      const key = e.key;
      if (key === 'ArrowDown') {
        e.preventDefault();
        if (this.selectedItemIndex < this.filteredAutocomplete.length - 1) {
          this.markAsSelectedOptionItem(++this.selectedItemIndex);
        }
      } else if (key === 'ArrowUp') {
        e.preventDefault();
        if (this.selectedItemIndex > 0) {
          this.markAsSelectedOptionItem(--this.selectedItemIndex);
        }
      } else if (key === 'Enter') {
        e.preventDefault();
        this.onItemClick(this.selectedItemIndex);
        this.selectedItemIndex = -1;
      } else if (key === 'Escape') {
        e.preventDefault();
        this.markAsSelectedOptionItem(-1);
      }
    }
  }

  @HostListener('window:resize')
  @HostListener('window:scroll')
  onResize() {
    const content = this.elRef.nativeElement.querySelector('.autocomplete-content') as HTMLDivElement;
    if (content) {
      const contentRect = content.getBoundingClientRect();
      const inputRect = this.inputElement.nativeElement.getBoundingClientRect();
      const margin = 15;
      const minMenuHeight = 100;
      const maxMenuHeight = 300;

      const topSpace = Math.floor(inputRect.top);
      const bottomSpace = Math.floor(window.innerHeight - inputRect.bottom);

      const hasSpaceTop = minMenuHeight > bottomSpace && topSpace > bottomSpace;
      let menuHeight: number;
      if (hasSpaceTop) {
        // go above input
        menuHeight = Math.max(Math.min(inputRect.top - margin, maxMenuHeight), minMenuHeight);
        this.renderer.setStyle(content, 'top', `-${menuHeight}px`);
      } else {
        // go below input
        menuHeight = Math.min(Math.max(window.innerHeight - contentRect.y - margin, minMenuHeight), maxMenuHeight);
        this.renderer.setStyle(content, 'top', `${inputRect.height}px`);
      }
      this.renderer.setStyle(content, 'max-height', `${menuHeight}px`);
    }
  }

  getBoldText(value: string): string {
    if (!value) return value;
    const searchList = this.value.split(/\s/).filter(v => !!v);
    return searchList.reduce((accumulator, current) => accumulator.replace(current, `<b>${current}</b>`), value);
  }

  private filterItems() {
    this.showAutocomplete = !!this.autocompleteList?.length;
    if (this.autocompleteList?.length) {

      const searchList = this.value.split(/\s/).filter(v => !!v);
      this.filteredAutocomplete = this.autocompleteList.filter(item => searchList.every(val => item.includes(val)));
      setTimeout(() => {
        this.onResize();
      });
    }
  }
}
