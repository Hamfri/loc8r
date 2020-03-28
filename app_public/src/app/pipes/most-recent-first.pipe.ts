import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostRecentFirst'
})
export class MostRecentFirstPipe implements PipeTransform {

  private compare(a, b) {
    const createdOnA = a.createdOnA;
    const createdOnB = b.createdOnB;

    let comparison = 1;
    if(createdOnA > createdOnB){
      comparison = -1;
    }
    return comparison;
  }

  transform(reviews: any[]): any {
    if(reviews && reviews.length > 0){
      return reviews.sort(this.compare);
    }
    return null;
  }

}
