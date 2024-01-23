import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionService } from '../services/subscription.service';
import { subscribe } from 'src/models/subscribe';
// import { subscribe } from '../models/subscribe'; // Adjust the path accordingly

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit {

  subscribeForm!: FormGroup;
  errorshow:boolean=false;
  successhow:boolean=false


  constructor(
    private fb: FormBuilder,
    private subscribeservice: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.subscribeForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.subscribeForm.controls;
  }

  onSubmit() {
    if (this.subscribeForm.valid) {
      const subscription: subscribe = {
        username: this.f['username'].value,
        email: this.f['email'].value
      };
      this.subscribeservice.checksubs(subscription.email).subscribe(val=>{
        console.log(val)
        if(val.empty){
          this.subscribeservice.savesubscribers(subscription);
          this.successhow=true

        }else{
          this.errorshow=true
        }
      })

      console.log('Subscriber saved:', subscription);

      // Reset the form after submission
      this.subscribeForm.reset();
    }
  }

}
