
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SearchpipePipe } from 'src/app/pipes/searchpipe.pipe';
import { AddtocartService } from 'src/app/services/addtocart.service';
import { CardService } from 'src/app/services/card.service';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-bikecard',
  templateUrl: './bikecard.component.html',
  styleUrls: ['./bikecard.component.css']
})
export class BikecardComponent implements OnInit {
  searchkey!: string;
  filtercategory!: Array<any>;
  productlist!: Array<any>;
  policyCategory = '2 wheeler';
  public currentFilter: any; // Property to hold the current filter value



  // filtercategory: any;
  // public productlist: any;


  public viewcount:any
  displayCount: number = 8; // Number of initially displayed products

  constructor(private api: CardService, private cartapi: AddtocartService,private router:Router,private insuranceservices:InsuranceService) {
      
    this.insuranceservices.loadInsurance().subscribe(res=>{
      this.productlist=res;
     this.productlist= this.productlist.filter(plan => plan.data.policycategory === this.policyCategory);
      console.log("all insurance",res);
      this.viewcount=this.productlist
      this.filtercategory = res.slice(0, this.displayCount); 
      console.log("all filtercategory",this.filtercategory);

      // Initial display **********

    })
        
    // this.api.getProduct().subscribe(res => {
    //   this.productlist = res;
    //   this.viewcount=res
    //   this.filtercategory = res.slice(0, this.displayCount); // Initial display **********
    //   this.productlist.forEach((a: any) => {
    //     if (a.category === "men's clothing" || a.category === "women's clothing") {
    //       a.category = "fashion";
    //     }
    //     Object.assign(a, { quantity: 1, total: a.price });
    //   });
    //   console.log(res);
    // });

    this.cartapi.search.subscribe((val: any) => {
      this.searchkey = val;
    });
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page when navigation ends
        window.scrollTo(0, 0);
      }
    });  }

  addtocart(product: any) {
    this.cartapi.addCart(product);
  }

  // Four nav option function here
  // filter(category: string) {
  //   this.filtercategory = this.productlist.filter((a: any) => {
  //     if (a.data.policytype === category) {
  //       return a;
  //     }
  //   });
  // }
  filter1(category: string) {
    this.currentFilter = "1'st party"// Update the current filter value
    this.filtercategory = this.productlist.filter((a: any) => {
      return a.data.policytype == this.currentFilter;
    });
  }
  filter2(category: string) {
    this.currentFilter = "2'st party"// Update the current filter value
    this.filtercategory = this.productlist.filter((a: any) => {
      return a.data.policytype == this.currentFilter;
    });
  }
  filter3 (category: string) {
    this.currentFilter = "3'st party"
    this.filtercategory = this.productlist.filter((a: any) => {
      return a.data.policytype == this.currentFilter;
    });
  }
  filter4(category: string) {
    this.currentFilter = "Add ons"// Update the current filter value
    this.filtercategory = this.productlist.filter((a: any) => {
      return a.data.policytype == this.currentFilter;
    });
  }
  // "View More" button function
  loadMore() {
    this.displayCount = this.productlist.length;
    this.filtercategory = this.productlist;
  }
}
