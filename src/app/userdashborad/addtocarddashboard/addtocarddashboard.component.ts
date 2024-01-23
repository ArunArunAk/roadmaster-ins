
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AddtocartService } from 'src/app/services/addtocart.service';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-addtocarddashboard',
  templateUrl: './addtocarddashboard.component.html',
  styleUrls: ['./addtocarddashboard.component.css']
})
export class AddtocarddashboardComponent  implements OnInit {
  public productlist:any;
  public grandamount !:number;
   constructor(private addtocart:AddtocartService,private router:Router){}
  
  ngOnInit(): void {
    
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Scroll to the top of the page when navigation ends
          window.scrollTo(0, 0);
        }
      });  


   this.addtocart.getproduct().subscribe(a=>{
     this.productlist=a;
     this.grandamount=this.addtocart.gettotalAmout();
  
   })
  
  }
  removeItem(product:any){
    this.addtocart.removecartItem(product);
    console.log("dd",product);
  }
  removeall(){
    this.addtocart.removeall();
  }
  
}
