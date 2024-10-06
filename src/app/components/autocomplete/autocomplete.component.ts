import {Component, ElementRef, HostListener, Input, OnInit, QueryList, Renderer2, Self, ViewChild, ViewChildren} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';


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

  @ViewChildren('autocompleteItem') autocompleteItems!: QueryList<ElementRef<HTMLParagraphElement>>;

  @ViewChild('inputElement', {static: true}) inputElement!: ElementRef<HTMLInputElement>;

  autocompleteList: string[] = ['data 1', 'data 2', 'data 3', 'data 4', 'data 5', 'data 6', 'data 7', 'data 8', 'data9', 'data10', 'data11', 'data12', 'data13', 'data14', 'data15', 'data16', 'data17', 'data18', 'data19', 'data20', 'data21'];
  filteredAutocomplete: string[] = [];

  @Input() placeholder: string | undefined;

  @Input() id!: string;

  showAutocomplete = false;

  value: any = '';

  selectedItemIndex = -1;
  selectedItemId: string | null = null;

  constructor(@Self() private elRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
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

  markAsSelectedOptionItem(index: number) {
    setTimeout(() => {
      this.selectedItemIndex = this.filteredAutocomplete?.length ? index : -1;
      const el = this.autocompleteItems.get(index)?.nativeElement;
      this.selectedItemId = el?.id || null;
      el?.scrollIntoView({block: 'nearest'});
    });
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (this.showAutocomplete && this.autocompleteItems?.length) {
      const key = e.key;
      if (key === 'ArrowDown') {
        e.preventDefault();
        this.markAsSelectedOptionItem(++this.selectedItemIndex);
      } else if (key === 'ArrowUp') {
        e.preventDefault();
        this.markAsSelectedOptionItem(--this.selectedItemIndex);
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

  private filterItems() {
    this.showAutocomplete = !!this.autocompleteList?.length;
    if (this.autocompleteList?.length) {
      this.filteredAutocomplete = this.autocompleteList.filter(item => item.includes(this.value));
      setTimeout(() => {
        this.onResize();
        this.autocompleteItems.forEach(item => item.nativeElement.innerHTML = item.nativeElement.innerText.replace(this.value, `<strong>${this.value}</strong>`));
      });
    }
  }
}
