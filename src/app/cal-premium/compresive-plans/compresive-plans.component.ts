import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-compresive-plans',
  templateUrl: './compresive-plans.component.html',
  styleUrls: ['./compresive-plans.component.css']
})
export class CompresivePlansComponent implements OnInit {
  originalPlans: Array<any> = [];
  filteredPlans: Array<any> = [];
  policyCategory = '2 wheeler'; // Replace with the desired policy category
  showspinner=true;
  bikeNumber!:any
  currentFilter:any;
  filtercategory!: Array<any>;


  constructor(private insuranceservice: InsuranceService,private spinner: NgxSpinnerService
    ,private route:ActivatedRoute,private router:Router) {}

  ngOnInit(): void {

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Scroll to the top of the page when navigation ends
          window.scrollTo(0, 0);
        }
      });  

    this.route.queryParams.subscribe(params => {
      this.bikeNumber = params['bikeNumber'];
      console.log('Bike Number from queryParams:', this.bikeNumber);
    });
    this.spinner.show()
   

    this.insuranceservice.loadInsurance().subscribe(value => {
      this.originalPlans = value;

      // Filter plans based on the policy category
      this.filteredPlans = this.originalPlans.filter(plan => plan.data.policycategory === this.policyCategory);
      setTimeout(() => {
        this.showspinner=false

        this.spinner.hide();

      },6000);
      console.log(this.filteredPlans);
    });
  }
  
  onDropdownChange(event: any) {
    const selectedValue = event.target.value;

    // Call the corresponding filter function based on the selected option
    switch (selectedValue) {
      case 'option1':
        this.filterAll();
        break;
      case 'option2':
        this.filter1('1st party');
        break;
      case 'option3':
        this.filter2('2nd party');
        break;
      case 'option4':
        this.filter3('3rd party');
        break;
      case 'option5':
        this.filter4('Add ons');
        break;
      default:
        // Handle default case or do nothing
        break;
    }
  
  
  
  
   
}
fliter() {
  // Your logic for filtering 'All'
  this.filteredPlans = this.originalPlans;
}
filter1(category: any) {
  this.currentFilter = "1'st party"; // Update the current filter value
  this.filtercategory = this.originalPlans.filter(
    (a: any) => a.data.policytype == this.currentFilter
  );
  this.filteredPlans = this.filtercategory;
}
filter2(category: any) {
  this.currentFilter = "2'st party"; // Update the current filter value
  this.filtercategory = this.originalPlans.filter(
    (a: any) => a.data.policytype == this.currentFilter
  );
  this.filteredPlans = this.filtercategory;
}

filter3(category: any) {
  this.currentFilter = "3'st party"; // Update the current filter value
  this.filtercategory = this.originalPlans.filter(
    (a: any) => a.data.policytype == this.currentFilter
  );
  this.filteredPlans = this.filtercategory;
}

filter4(category: any) {
  this.currentFilter = 'Add ons'; // Update the current filter value
  this.filtercategory = this.originalPlans.filter(
    (a: any) => a.data.policytype == this.currentFilter
  );
  this.filteredPlans = this.filtercategory;
}
filterAll(){
  this.filteredPlans = this.originalPlans.filter(
    (plan) => plan.data.policycategory === this.policyCategory
  );
}
}

