import { Component, OnInit } from '@angular/core';
import { ClaimService } from 'src/app/services/claim.service';
import { RegisterService } from 'src/app/services/register.service';
import { UserinsurancedetailService } from 'src/app/services/userinsurancedetail.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  paidInsuranceCount=0;
  freeInsuranceCount= 0;
  waitingForAdminCount=0;
  TotalInsurance=0
  firstName!:any;
  userId!:any;
  lastName!:any
  userdetail!:any;
  ListOfUserInsurance!: Array<any>;
  ListOfPersonalUserInsurance!: Array<any>;
  freeInsurance="free";
  paidInsurance="paid"
  adminAccess:boolean=false
  TotalClaim=0
   listoftotalclaim!: Array<any>;




  constructor(private registerservice:RegisterService,private userinsurance:UserinsurancedetailService,private claimservice:ClaimService) { }

  ngOnInit() {
    this.userdetail=this.registerservice.loginUserId();
    this.firstName=this.userdetail.username;
    this.lastName=this.userdetail.lastname
    this.userId=this.userdetail.userId;

    this.userinsurance.loadData().subscribe(x=>{
      this.ListOfUserInsurance=x;

      this.ListOfPersonalUserInsurance=  this.ListOfUserInsurance.filter(plan => plan.data.userid === this.userId);
      this.TotalInsurance=this.ListOfPersonalUserInsurance.length;

     

      let ListOfUserFreeInsurance!: Array<any>;
     ListOfUserFreeInsurance=  this.ListOfPersonalUserInsurance.filter(plan => plan.data.kindOfInsurance === this.freeInsurance);
       this.freeInsuranceCount=ListOfUserFreeInsurance.length
      console.log(this.ListOfPersonalUserInsurance)

      let ListOfUserpaidInsurance!: Array<any>;
      ListOfUserpaidInsurance=  this.ListOfPersonalUserInsurance.filter(plan => plan.data.kindOfInsurance === this.paidInsurance);
      this.paidInsuranceCount=ListOfUserpaidInsurance.length

      let ListOfUserAdminAcessInsurance!: Array<any>;
      ListOfUserAdminAcessInsurance=  this.ListOfPersonalUserInsurance.filter(plan => plan.data.adminAccess === this.adminAccess);
      this.waitingForAdminCount=ListOfUserAdminAcessInsurance.length





    })



    this.claimservice.loadClaimData().subscribe(value=>{
      this.listoftotalclaim=value
      console.log(this.listoftotalclaim)
      let listofpersonalclaim!: Array<any>;

      listofpersonalclaim= this. listoftotalclaim.filter(plan => plan.data.userid === this.userId);
      console.log("kkkkkkkk",listofpersonalclaim)
        this.TotalClaim=listofpersonalclaim.length
       console.log(this.ListOfPersonalUserInsurance)

    })

      
     
  }
}
