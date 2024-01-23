
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit  {
  changeEmailForm!: FormGroup;
  userdetail:any;
  userid:any;

  constructor(private fb: FormBuilder,private regsiterservices:RegisterService) { }

  ngOnInit(): void {
    this.changeEmailForm = this.fb.group({
      newEmail: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]]
    }, {
      validators: this.emailsMatchValidator
    });
  }

  emailsMatchValidator(formGroup: FormGroup) {
    const newEmail = formGroup.get('newEmail')!.value;
    const confirmEmail = formGroup.get('confirmEmail')!.value;

    if (newEmail === confirmEmail) {
      formGroup.get('confirmEmail')!.setErrors(null);
    } else {
      formGroup.get('confirmEmail')!.setErrors({ emailMismatch: true });
    }
  }
  get fc(){
    return this.changeEmailForm.controls
 }
  changeEmail() {

   this.userdetail=this.regsiterservices.loginUserId();
   this.userid=this.userdetail.userId
  
    const emailupdated={
      email:this.changeEmailForm.value.confirmEmail
    }
    this.regsiterservices.updateemail(this.userid,emailupdated)
   this.changeEmailForm.reset()
  }
 


  }


