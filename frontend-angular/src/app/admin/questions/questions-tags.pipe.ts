import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'array',
  pure: true
})


export class QuestionsTagsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      return value.join();
  }

}
