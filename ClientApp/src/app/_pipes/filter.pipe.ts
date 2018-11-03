import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../_models/common/recipe';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  containsFilter(texts: string[], filter: string) {
    for (const text of texts) {
      if (filter && text.toLowerCase().indexOf(filter) >= 0) { return true; }
    }
    return false;
  }

  transform(items: Recipe[], filterString: string): Recipe[] {
    if (!filterString) { return items; }
    return items.filter(recipe => {
      let ok = false;
      if (recipe) {
        if (this.containsFilter([ recipe.requester, recipe.name ], filterString)) { ok = true; }
      }
      return ok;
    });

  }

}
