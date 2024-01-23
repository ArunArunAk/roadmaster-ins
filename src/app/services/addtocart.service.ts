import { Injectable } from '@angular/core';
import { BehaviorSubject,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddtocartService {

  cartitemlist:any=[];
  public productlist=new BehaviorSubject<any>([]);
  
  public search =new BehaviorSubject<string>("");

  constructor() { }

  getproduct(){
    return this.productlist.asObservable();
  }
setproduct(product:any){
  this.cartitemlist.push(product);
  this.productlist.next(product);

}
addCart(product :any){
   this.cartitemlist.push(product);
   this.productlist.next(this.cartitemlist);
   this.gettotalAmout();
   console.log(this.cartitemlist);
 

}

gettotalAmout(){
  let grandtotal=0;
  this.cartitemlist.map((a:any)=>{
     grandtotal += a.data.policyprice;
  })
  return grandtotal;
}

 removecartItem(product : any){
 
  this.cartitemlist = this.cartitemlist.filter((item: any) => item.id != product.id);

   this.productlist.next(this.cartitemlist)   //this line decrease and increase badge
  
 }


 removeall(){
  this.cartitemlist=[];
  this.productlist.next(this.cartitemlist)

 }
}
