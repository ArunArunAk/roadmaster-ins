

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'app-car',
    templateUrl: './car.component.html',
    styleUrls: ['./car.component.css']
  })

export class CarComponent implements OnInit {
  premiumForm!: FormGroup;

  constructor(private fb: FormBuilder,private spinner: NgxSpinnerService,private route:Router) { }

  ngOnInit() {

      this.route.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Scroll to the top of the page when navigation ends
          window.scrollTo(0, 0);
        }
      });  

    this.premiumForm = this.fb.group({
      carNumber: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2}\d{2}[A-Za-z]\d{4}$/)]]
    });
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  submitForm() {
    if (this.premiumForm.valid) {
      const bikeNumber = this.premiumForm.value.carNumber;

      console.log('Form submitted with valid data:', this.premiumForm.value);
      this.route.navigate(['/planscar'], { queryParams: { bikeNumber } });

    } else {
      // Mark form controls as touched to display validation errors
      this.premiumForm.markAllAsTouched();
    }
  }
}
