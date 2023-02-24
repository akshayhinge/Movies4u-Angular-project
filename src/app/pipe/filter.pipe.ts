import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string[], propName: string):any[] {

    const resultArray = [];
  
      if (value.length===0 || propName === '' || filterString.length==0) {
        return value;
      }
      value.forEach(e=>{
        filterString.forEach(v=>{
          if(e[propName].trim().toLowerCase().includes(v.toLowerCase())){
            resultArray.push(e);
          }

        })
      });
      return resultArray;
    
  }
}
