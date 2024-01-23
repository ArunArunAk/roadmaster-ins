import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InsuranceService } from '../services/insurance.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  constructor(private toastr: ToastrService,private router:Router,private spinner: NgxSpinnerService,private insuranceservice:InsuranceService 
    ) {}
  ngOnInit(): void {
    this.spinner.show();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page when navigation ends
        window.scrollTo(0, 0);
      }
    });

    this.insuranceservice.loadInsurance().subscribe(
      (val) => {
        let latestpostarray: Array<any> = val;
        console.log(latestpostarray);
        
        this.spinner.hide();
      },
      (error) => {
        console.error('Error loading insurance:', error);
        this.spinner.hide();
      }
    );
  }

  contactFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };

  submitForm(contactForm: any) {
    if (contactForm.valid) {
      console.log("Form submitted!", this.contactFormData);

      // Show success message to the user
      this.toastr.success('Our team will contact you.', 'Success', {
        timeOut: 5000, // 5 seconds
        positionClass: 'toast-top-center',
        progressBar: true,
        closeButton: true
      });

      // Reset the form data after submission if needed
      this.resetForm();
      window.scrollTo(0, 0);

    }
  }

  resetForm() {
    // this.contactFormData = {
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   phone: '',
    //   message: ''
    // };
  }
}
