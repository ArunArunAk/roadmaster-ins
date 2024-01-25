import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/services/register.service';
import { register } from 'src/models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,private registrationservices:RegisterService,private router:Router,private toaste:ToastrService) {}

  ngOnInit() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page when navigation ends
        window.scrollTo(0, 0);
      }
    });

    if (this.registrationservices.isloggedinmethod()) {
      this.router.navigate(['/']);
    }

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    // Handle form submission here
    let registration: register = {
      firstname: this.registerForm.value.firstName,
      lastname: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      userImage:''


    };
    console.log(this.registerForm.value);
    this.registrationservices.checksubs(this.registerForm.value.email).subscribe(val=>{
      if(val.empty){
        this.registerForm.reset();
        console.log("registration",registration);
       this.registrationservices.savedata(registration);
      }else{
        this.toaste.warning("email In already use","warning")
        window.scrollTo(0, 0);

      }
    })
   
    
  }
}
