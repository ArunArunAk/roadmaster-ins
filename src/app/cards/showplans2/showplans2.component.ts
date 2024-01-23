import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { InsuranceService } from 'src/app/services/insurance.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RegisterService } from 'src/app/services/register.service';
import { UserinsurancedetailService } from 'src/app/services/userinsurancedetail.service';

declare var $: any;

@Component({
  selector: 'app-showplans2',
  templateUrl: './showplans2.component.html',
  styleUrls: ['./showplans2.component.css']
})
export class Showplans2Component implements OnInit {
  amount = 500;
  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
  @ViewChild('freeInsuranceModal') freeInsuranceModal!: ElementRef;
  bikenumber!: any;
  singleinsurancedetails!: any;
  insuranceForm!: FormGroup;
  insuranceFormssss!: FormGroup;


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

    this.insuranceFormssss = this.fb.group({
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

  onSubmit() {
    // Perform form submission logic here
    console.log('Form submitted:', this.insuranceForm.value);

    // Close the modal after submission
    $(this.freeInsuranceModal.nativeElement).modal('hide');

    // Reset the form after submission
    this.insuranceForm.reset();
  }

  ngOnInit(): void {

    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page when navigation ends
        window.scrollTo(0, 0);
      }
    }); 

    this.insuranceForm = this.fb.group({
      vehicleNo: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2}\d{2}[A-Za-z]\d{4}$/)]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      state: ['', Validators.required],
      country: ['', Validators.required],
      
    });

    this.Routerparamsget.params.subscribe(val => {
      console.log("params", val);
      this.bikenumber = val['bikenumber'];
      console.log("bikenumber", this.bikenumber);
         this.bikenumber=this.insuranceForm.value.vehicleNo
      this.insuranceFormssss.get('VehicleNumber')?.setValue(this.bikenumber);
      this.insuranceFormssss.get('firstname')?.setValue(this.username);
      this.insuranceFormssss.get('lastname')?.setValue(this.userlastname);
      this.insuranceFormssss.get('email')?.setValue(this.useremail);
      this.insuranceFormssss.get('userid')?.setValue(this.userid);




      this.insuranceservice.loadInsuranceusingid(val['id']).subscribe(posts => {
        this.singleinsurancedetails = posts;
        console.log("singleinsurancedetails", this.singleinsurancedetails);

        const policyprovidername = this.singleinsurancedetails?.data?.policyprovidername;
        this.insuranceFormssss.get('insuranceprovider')?.setValue(policyprovidername);

        const policytype = this.singleinsurancedetails?.data?.policytype;
        this.insuranceFormssss.get('policytype')?.setValue(policytype);

        this.bikenumber=this.insuranceForm.value.vehicleNo
        this.insuranceFormssss.get('VehicleNumber')?.setValue(this.insuranceForm.value.vehicleNo);

        const policyprice = this.singleinsurancedetails?.data?.policyprice;
        this.insuranceFormssss.get('policyprice')?.setValue(policyprice);
        this.amount=policyprice

        const policyduration = this.singleinsurancedetails?.data?.policyduration;
        this.insuranceFormssss.get('policyduration')?.setValue(policyduration);

        const policyid = this.singleinsurancedetails?.data?.policyid;
        this.insuranceFormssss.get('policyid')?.setValue(policyid);

        const policyname = this.singleinsurancedetails?.data?.policyname;
        this.insuranceFormssss.get('policyname')?.setValue(policyname);

        const policycategory = this.singleinsurancedetails?.data?.policycategory;
        this.insuranceFormssss.get('policycategory')?.setValue(policycategory);

       

        const startingDate = this.insuranceFormssss.get('TakeInsurancedate')?.value;

        if (policyduration && startingDate) {
          const expirationDate = this.calculateExpirationDate(startingDate, policyduration);
          this.insuranceFormssss.get('ExpirationDate')?.setValue(expirationDate);
          console.log('ExpirationDate:', expirationDate);
        }

        console.log("Form after setting insuranceprovider:", this.insuranceFormssss.value);
      });
    });

  

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
    ).render(this.paymentRef.nativeElement);  }

  get f() {
    return this.insuranceForm.controls;
  }

  cancel() {
    this.router.navigate(['bikecard']);
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

  // Method for handling the free insurance button click
  getFreeInsurance() {
    this.insuranceForm.reset();

    // Open the modal programmatically
    $(this.freeInsuranceModal.nativeElement).modal('show');
  }
  getFreeInsuranceuser() {
    this.bikenumber=this.insuranceForm.value.vehicleNo
    this.insuranceFormssss.get('VehicleNumber')?.setValue(this.insuranceForm.value.vehicleNo);
    console.log('Free Insurance clicked');
    console.log('Form values before submission:', this.insuranceFormssss.value);
    this.router.navigate(['/success-freeinsurance',this.userid]); // Adjust the route accordingly
    this.insuranceofuser.UserOfInsurancedetailofData(this.insuranceFormssss.value)
    $(this.freeInsuranceModal.nativeElement).modal('hide');


  }
  close(){
    $(this.freeInsuranceModal.nativeElement).modal('hide');

  }
  paypal(){
    console.log("paypal is clicked");
    this.insuranceForm.get('kindOfInsurance')?.setValue('paid');
    this.insuranceForm.get('adminAccess')?.setValue(true);

   console.log(this.insuranceForm.value)
   this.insuranceFormssss.get('VehicleNumber')?.setValue("roadMsater");

    this.insuranceofuser.UserOfInsurancedetailofData(this.insuranceForm.value)
  }
}
