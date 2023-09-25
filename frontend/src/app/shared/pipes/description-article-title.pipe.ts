import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionArticleTitle'
})
export class DescriptionArticleTitlePipe implements PipeTransform {

  transform(value: string): string {
    const res = value.length <=80 ? value : `${value.slice(0, 80)}...`;
    return res;
  }
}
