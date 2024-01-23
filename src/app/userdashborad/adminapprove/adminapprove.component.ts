import { Component } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { UserinsurancedetailService } from 'src/app/services/userinsurancedetail.service';

@Component({
  selector: 'app-adminapprove',
  templateUrl: './adminapprove.component.html',
  styleUrls: ['./adminapprove.component.css']
})
export class AdminapproveComponent {
  userdetail!:any;
  ListOfUserInsurance!: Array<any>;
  ListOfPersonalUserInsurance!: Array<any>;
  ListOfUserpaidInsurance!: Array<any>;
  ListOfUserFreeInsurance!: Array<any>;

  freeInsurance="free";
  paidInsurance="paid"
  adminAccess:boolean=false;
  userId!:any;
  FreeInsuranceView:boolean=false;


  constructor(private registerservice:RegisterService,private userinsurance:UserinsurancedetailService) { }

ngOnInit() {
  this.userdetail=this.registerservice.loginUserId();
  this.userId=this.userdetail.userId;

  this.userinsurance.loadData().subscribe(x=>{
    this.ListOfUserInsurance=x;

    this.ListOfPersonalUserInsurance=  this.ListOfUserInsurance.filter(plan => plan.data.userid === this.userId);

   this.ListOfUserFreeInsurance=  this.ListOfPersonalUserInsurance.filter(plan => plan.data.kindOfInsurance === this.freeInsurance);
    console.log(this.ListOfPersonalUserInsurance)


   this. ListOfUserpaidInsurance=  this.ListOfPersonalUserInsurance.filter(plan => plan.data.kindOfInsurance === this.paidInsurance);

    this.ListOfUserFreeInsurance=  this.ListOfUserFreeInsurance.filter(plan => plan.data.adminAccess === this.adminAccess);


if(this.ListOfUserFreeInsurance.length > 0){
  this.FreeInsuranceView=true
}


  })




   
}
}
