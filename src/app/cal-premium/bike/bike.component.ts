
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'app-bike',
    templateUrl: './bike.component.html',
    styleUrls: ['./bike.component.css']
  })

export class BikeComponent implements OnInit {
  premiumForm!: FormGroup;

  constructor(private fb: FormBuilder,private spinner: NgxSpinnerService,private router:Router) { }

  ngOnInit() {


      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Scroll to the top of the page when navigation ends
          window.scrollTo(0, 0);
        }
      });  

    this.premiumForm = this.fb.group({
      bikeNumber: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2}\s?\d{2}\s?[A-Za-z]{1,2}\s?\d{4}$/
      )]]
    });
      this.spinner.show()
      setTimeout(() => {
        this.spinner.hide();
      }, 5000);
    
  }

  submitForm() {
    if (this.premiumForm.valid) {
      const bikeNumber = this.premiumForm.value.bikeNumber;

      console.log('Form submitted with valid data:', this.premiumForm.value);
      this.router.navigate(['/plans'], { queryParams: { bikeNumber } });

    } else {
      // Mark form controls as touched to display validation errors
      this.premiumForm.markAllAsTouched();
    }
  }
}
