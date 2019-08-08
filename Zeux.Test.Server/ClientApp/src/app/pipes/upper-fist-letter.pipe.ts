import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperFistLetter'
})
export class UpperFistLetterPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
