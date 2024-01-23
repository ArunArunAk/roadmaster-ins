import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { InsuranceService } from '../services/insurance.service';
import { NgxSpinnerService } from 'ngx-spinner';
import AOS from 'aos';
import { RegisterService } from '../services/register.service';
import { UserinsurancedetailService } from '../services/userinsurancedetail.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {

  Nouser:any=0;
  NoBlog:any=0;
  NouserInsuranceTake:any=0

  constructor(private router: Router, private insuranceservice: InsuranceService, private spinner: NgxSpinnerService,private registerservice:RegisterService,private userinsurance:UserinsurancedetailService ) {}

  ngOnInit(): void {
    this.spinner.show();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page when navigation ends
        window.scrollTo(0, 0);
      }
    });

    this.registerservice.loadData().subscribe(val=>{
      let totaluser: Array<any> = val;
      this.Nouser=totaluser.length
    })

    this.userinsurance.loadData().subscribe(val=>{
      let totalinsuranceuser: Array<any> = val;
      this.NouserInsuranceTake=totalinsuranceuser.length
    })

    this.insuranceservice.loadInsurance().subscribe(
      (val) => {
        let latestpostarray: Array<any> = val;
        console.log(latestpostarray);
        this.NoBlog=latestpostarray.length
        this.spinner.hide();
      },
      (error) => {
        console.error('Error loading insurance:', error);
        this.spinner.hide();
      }
    );
  }

  ngAfterViewInit(): void {
    // Check screen size and initialize AOS only on lg screens
    if (window.innerWidth >= 992) { // 992 pixels is just an example, adjust as needed
      AOS.init({
        duration: 600,
        easing: 'linear',
      });
    }
  }
}
