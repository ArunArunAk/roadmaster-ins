import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsuranceService } from 'src/app/services/insurance.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RegisterService } from 'src/app/services/register.service';
import { UserinsurancedetailService } from 'src/app/services/userinsurancedetail.service';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-showplan',
  templateUrl: './showplan.component.html',
  styleUrls: ['./showplan.component.css']
})
export class ShowplanComponent implements OnInit {
  amount :any;
  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
  bikenumber!: any;
  singleinsurancedetails!: any;
  insuranceForm: FormGroup;
  showModal = false;
  policyprovidername: any;
  policycategory: any;
  policytype: any;
  policyprice: any;
  policyduration: any;
  policyid: any;
  policyname: any;

  userdetail:any;
  username:any;
  userlastname:any;
  userid:any;
  useremail:any;

  paypalpaymentId:any;




  constructor(
    private router: Router,
    private payment: PaymentService,
    private Routerparamsget: ActivatedRoute,
    private insuranceservice: InsuranceService,
    private fb: FormBuilder,
    private registerservice:RegisterService,
    private insuranceofuser:UserinsurancedetailService
  ) {
    this.bikenumber = 'YOUR_BIKENUMBER_VALUE';
    this.userdetail=this.registerservice.loginUserId();
   this.username=this.userdetail.username;
   this.userid=this.userdetail.userId
   this.useremail=this.userdetail.email
   this.userlastname=this.userdetail.lastname

   console.log(this.username)
   console.log(this.userid)
   console.log(this.userdetail)
   console.log(this.useremail)


    console.log("bikenumber before setting in form:", this.bikenumber);

    this.insuranceForm = this.fb.group({
      TakeInsurancedate: [new Date(), Validators.required],
      adminAccess: [false],
      kindOfInsurance: ['free'],
      VehicleNumber: [this.bikenumber],
      insuranceprovider: [this.policyprovidername], // Initialize with an empty value
      policycategory: [this.policycategory],
      policytype: [this.policytype],
      policyprice: [this.policyprice],
      policyduration: [this.policyduration],
      policyid: [this.policyid],
      policyname: [this.policyname],
      ExpirationDate: [null], // Add a field for expiration date
      firstname:[this.username],
      lastname:[this.userlastname],
      email:[this.useremail],
      userid:[this.userid],
    });
  }

  ngOnInit(): void {


      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Scroll to the top of the page when navigation ends
          window.scrollTo(0, 0);
        }
      });  

    this.Routerparamsget.params.subscribe(val => {
      console.log("params", val);
      this.bikenumber = val['bikenumber'];
      console.log("bikenumber", this.bikenumber);

      this.insuranceForm.get('VehicleNumber')?.setValue(this.bikenumber);
      this.insuranceForm.get('firstname')?.setValue(this.username);
      this.insuranceForm.get('lastname')?.setValue(this.userlastname);
      this.insuranceForm.get('email')?.setValue(this.useremail);
      this.insuranceForm.get('userid')?.setValue(this.userid);




      this.insuranceservice.loadInsuranceusingid(val['id']).subscribe(posts => {
        this.singleinsurancedetails = posts;
        console.log("singleinsurancedetails", this.singleinsurancedetails);

        const policyprovidername = this.singleinsurancedetails?.data?.policyprovidername;
        this.insuranceForm.get('insuranceprovider')?.setValue(policyprovidername);

        const policytype = this.singleinsurancedetails?.data?.policytype;
        this.insuranceForm.get('policytype')?.setValue(policytype);

        const policyprice = this.singleinsurancedetails?.data?.policyprice;
        this.insuranceForm.get('policyprice')?.setValue(policyprice);
        this.amount=policyprice

        const policyduration = this.singleinsurancedetails?.data?.policyduration;
        this.insuranceForm.get('policyduration')?.setValue(policyduration);

        const policyid = this.singleinsurancedetails?.data?.policyid;
        this.insuranceForm.get('policyid')?.setValue(policyid);

        const policyname = this.singleinsurancedetails?.data?.policyname;
        this.insuranceForm.get('policyname')?.setValue(policyname);

        const policycategory = this.singleinsurancedetails?.data?.policycategory;
        this.insuranceForm.get('policycategory')?.setValue(policycategory);

       

        const startingDate = this.insuranceForm.get('TakeInsurancedate')?.value;

        if (policyduration && startingDate) {
          const expirationDate = this.calculateExpirationDate(startingDate, policyduration);
          this.insuranceForm.get('ExpirationDate')?.setValue(expirationDate);
          console.log('ExpirationDate:', expirationDate);
        }

        console.log("Form after setting insuranceprovider:", this.insuranceForm.value);
      });
    });

    console.log(window.paypal);
    window.paypal.Buttons({
      style: {
        layout: 'horizontal',
        color: 'blue',
        shape: 'rect',
        label: 'paypal',
      },
      createOrder:(data:any,actions:any) =>{
        return actions.order.create({
          purchase_units:[
            {
              amount:{
                value:this.amount.toString(),
                currency_code:'USD'
              }
            }
          ]
        })
      },
     
      onApprove:(data:any,actions:any)=>{
           return actions.order.capture().then((details:any)=>{
            console.log(details)
            if(details.status === 'COMPLETED'){
                this.paypalpaymentId=details.id;
                this.router.navigate(['/success-paypal',this.paypalpaymentId]); // Adjust the route accordinglythis.
                this.paypal()

              }
           });
      },
      onError:(error:any)=>{
        console.log("error")

      }
    }
    ).render(this.paymentRef.nativeElement);
  }

  calculateExpirationDate(startingDate: Date, policyDuration: string): Date {
    const yearsRegex = /(\d+)\s+Years/i;
    const match = policyDuration.match(yearsRegex);

    if (match && match[1]) {
      const numberOfYears = parseInt(match[1], 10);
      const expirationDate = new Date(startingDate);
      expirationDate.setFullYear(expirationDate.getFullYear() + numberOfYears);
      return expirationDate;
    }

    // Handle invalid or unspecified policy duration
    return new Date('Invalid Date');
  }

  getFreeInsurance() {
    console.log('Free Insurance clicked');
    console.log('Form values before submission:', this.insuranceForm.value);
    this.router.navigate(['/success-freeinsurance',this.userid]); // Adjust the route accordingly
    this.insuranceofuser.UserOfInsurancedetailofData(this.insuranceForm.value)

  }
  paypal(){
    console.log("paypal is clicked");
    this.insuranceForm.get('kindOfInsurance')?.setValue('paid');
    this.insuranceForm.get('adminAccess')?.setValue(true);

   console.log(this.insuranceForm.value)
    this.insuranceofuser.UserOfInsurancedetailofData(this.insuranceForm.value)
  }
  
}
