import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: true
})
export class SortPipe implements PipeTransform {

  getPropertyValue(object: any, property: string): any {
    if (!object) { return null; }
    const arr = property.split('.');
    while (arr.length && (object = object[arr.shift()])) { }
    return object;
  }

  getItemValue(object: any, property: string): any {
    let value = this.getPropertyValue(object, property);
    if (value && value.valueOf) { value = value.valueOf(); }
    return value;
  }

  getEquality(item1: any, item2: any, fields: string[]): number {
    let direction = 1;
    let field = fields[0];
    if (field.startsWith('-')) {
      direction = -1;
      field = field.substring(1);
    }
    const value1 = this.getItemValue(item1, field);
    const value2 = this.getItemValue(item2, field);
    if (value1 === null && value2 !== null) { return 1; }
    if (value1 !== null && value2 === null) { return -1; }
    if (value1 > value2) { return 1 * direction; }
    if (value1 < value2) { return -1 * direction; }
    if (value1 === value2 && fields.length > 1) {
      fields.shift();
      return this.getEquality(item1, item2, fields);
    }
    return 0;
  }

  transform(items: any[], sortFields: string[]): any[] {
    const self = this;
    if (items) {
      return items.sort(function (item1, item2) {
        return self.getEquality(item1, item2, sortFields.slice(0));
      });
    } else {
      return items;
    }
  }
}
