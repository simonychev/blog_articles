import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionArticle'
})
export class DescriptionArticlePipe implements PipeTransform {

  transform(value: string): string {
    const res = value.length <=150 ? value : `${value.slice(0, 150)}...`;
    return res;
  }

}
