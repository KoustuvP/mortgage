import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propertyToWord'
})
export class PropertyToWordPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if(value){
      let returnValue='';
      let start=0;
      for(let i=0;i<value.length;i++){
        if(value.charCodeAt(i)>64&&value.charCodeAt(i)<91){
          returnValue+=value.substring(start,i)+" "+value.charAt(i);
          start=i+1;
        }
      }
      returnValue+=value.substring(start,value.length)
      returnValue=returnValue.charAt(0).toUpperCase()+returnValue.substring(1,returnValue.length);
      return returnValue;
    }
    return '';
  }

}
@Pipe({
  name: 'unknownToString'
})
export class UnknownToStringPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    if(value)
    return ""+value;
    return '';
  }

}
