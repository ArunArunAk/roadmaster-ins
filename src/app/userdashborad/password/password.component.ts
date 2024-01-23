

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  userdetail:any;
  userid:any
  oldpassword:any

  constructor(private fb: FormBuilder,private regsiterservices:RegisterService,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordsMatchValidator
    });

    this.userdetail=this.regsiterservices.loginUserId();
    this.userid=this.userdetail.userId 
    this.regsiterservices.getRegisterusingId(this.userid).subscribe(val=>{
      this.oldpassword=val.data.password
      console.log(this.oldpassword)
    })
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')!.value;
    const confirmPassword = formGroup.get('confirmPassword')!.value;

    if (newPassword === confirmPassword) {
      formGroup.get('confirmPassword')!.setErrors(null);
    } else {
      formGroup.get('confirmPassword')!.setErrors({ passwordMismatch: true });
    }
  }
  get fc(){
    return this.changePasswordForm.controls
 }

  changePassword() {
    console.log(this.changePasswordForm.value.currentPassword)
   if(this.oldpassword ===this.changePasswordForm.value.currentPassword ){
    const passwordupdated={
      password:this.changePasswordForm.value.confirmPassword
    }
    this.changePasswordForm.reset();

    this.regsiterservices.updatepassword(this.userid,passwordupdated);
   }else{
    this.toaster.warning("old password mismatch")

   }
    
  }
}
