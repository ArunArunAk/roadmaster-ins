import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpipe'
})
export class SearchpipePipe implements PipeTransform {
  transform(value: string[], searchtext: string,propname:string): any[] {
    // if (!value) return [];
    // if (searchtext === "") return value;
    // if(propname === "") return value;
   const result:any=[];
    searchtext = searchtext.toLowerCase();

    // return value.filter((ani) => ani.toLowerCase().includes(searchtext));
    
    value.forEach((a:any)=>{
      if(a[propname].trim().toLowerCase().includes(searchtext)){
        result.push(a);
      }
    })
    return result;

   }
}
