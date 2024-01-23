import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClaimService } from 'src/app/services/claim.service';
import { RegisterService } from 'src/app/services/register.service';
import { UserinsurancedetailService } from 'src/app/services/userinsurancedetail.service';

@Component({
  selector: 'app-claimprocess',
  templateUrl: './claimprocess.component.html',
  styleUrls: ['./claimprocess.component.css']
})
export class ClaimprocessComponent implements OnInit {
  claimForm!: FormGroup;
  ListOfPersonalUserInsurance!: Array<any>;
  userdetail!: any;
  userId!: any;
  ListOfUserInsurance!: Array<any>;



  constructor(private fb: FormBuilder,private claimservices:ClaimService,private registerservice: RegisterService, private userinsurance: UserinsurancedetailService, private route: ActivatedRoute,private router:Router,private toaster:ToastrService) {}

  ngOnInit() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page when navigation ends
        window.scrollTo(0, 0);
      }
    });
  
    this.userdetail = this.registerservice.loginUserId();
    this.userId = this.userdetail.userId;

    this.userinsurance.loadData().subscribe(x=>{
      this.ListOfUserInsurance = x;

      this.ListOfPersonalUserInsurance = this.ListOfUserInsurance.filter(plan => plan.data.userid === this.userId);
       console.log(this.ListOfPersonalUserInsurance)
    })
     

    this.claimForm = this.fb.group({
      bikeno: ['', [Validators.required]],

      policyId: ['', [Validators.required,Validators.pattern('.{5,}')]],
      policyName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      claimStatus: [false], // Set default value here
      claimDate:new Date(),
      userid:this.userId

    });
  }

  get f() {
    return this.claimForm.controls;
  }

  onSubmit() {
    let bikeno=this.claimForm.value.bikeno;
    let policyid=this.claimForm.value.policyId;
    if (this.claimForm.valid) {

     let checkbikeno!: Array<any>;
       checkbikeno=this.ListOfPersonalUserInsurance.filter(plan => plan.data.VehicleNumber === bikeno);
       let checkpolicyid!: Array<any>;
       checkpolicyid=this.ListOfPersonalUserInsurance.filter(plan => plan.data.policyid === policyid);
       console.log(checkpolicyid)


       if (checkbikeno.length > 0 && checkpolicyid.length > 0) {
        this.claimservices.addClaim(this.claimForm.value)

        console.log(this.claimForm.value);
        this.claimForm.reset();
        window.scrollTo(0, 0);
        
      }else{
        window.scrollTo(0, 0);
        this.toaster.warning("IN This PolicyId & Bike Num No Insurance is present","Warning")

      }
     
    } else {
      // Mark all fields as touched to display validation errors
    }
  }


}
