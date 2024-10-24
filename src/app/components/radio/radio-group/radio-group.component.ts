import {AfterContentInit, Component, ContentChildren, EventEmitter, HostBinding, Input, OnDestroy, Output, QueryList} from '@angular/core';
import {RadioComponent} from '../radio-button/radio.component';
import {IdGenerator} from '../../../utils/IdGenerator';
import {Subscription} from 'rxjs';


@Component({
  selector: 'fa-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss']
})
export class RadioGroupComponent<T = string> implements AfterContentInit, OnDestroy {

  @Output('selectedValue') radioOutput = new EventEmitter<T | null>();
  @Input() name: string = IdGenerator.generate();
  @Input() title: string | null = null;

  @ContentChildren(RadioComponent) radioButtons!: QueryList<RadioComponent>;
  @HostBinding('attr.group-name') hostName: string = `${this.name}-group`;

  private subscriptions: Subscription[] = [];

  ngAfterContentInit(): void {
    // case if radio buttons added dynamically
    this.radioButtons.changes.subscribe(() => {
      this.ngOnDestroy();
      this.subscribeToRadioButtons();
    });

    this.subscribeToRadioButtons();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions.length = 0;
  }

  private subscribeToRadioButtons(): void {
    if (this.radioButtons?.length) {
      this.radioButtons.forEach(item => {
        item.name = this.name;
        this.subscriptions.push(item.onSelected.subscribe(value => this.radioOutput.emit(value as T)));
      });
    }
  }
}
