import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  // pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(
    value: any,
    filterString: string,
    propName: string,
    length: number
  ): any {
    if (value.length === 0) return value;

    if (!filterString) return value;

    return value.filter(
      (v) => v[propName].toLowerCase() === filterString.toLowerCase()
    );
  }
}
