import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'datePlaceholder'
})
export class DatePlaceholderPipe implements PipeTransform {

  private placeholder = '__/__/____';

  transform(value?: string, ...args: unknown[]): unknown {
    if (!value) {
      return this.placeholder;
    }
    let newVal: string | undefined = undefined;
    for (const ch of value) {
      this.placeholder = this.placeholder.replace(/_/, ch);
    }

    return this.placeholder;
  }

}
