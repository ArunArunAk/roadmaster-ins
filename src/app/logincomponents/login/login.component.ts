import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  // userdetail!:Array<any>;
  singleuserdetail!:any;


  constructor(private fb: FormBuilder,private registerservivce:RegisterService,private toaster:ToastrService,private router:Router) {}

  ngOnInit() {


      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Scroll to the top of the page when navigation ends
          window.scrollTo(0, 0);
        }
      });  

    if (this.registerservivce.isloggedinmethod()) {
      this.router.navigate(['/']);
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    console.log("loginForm",this.loginForm)

    // this.registerservivce.loadData().subscribe(val=>{
    //      this.userdetail=val
    //      console.log('userdetail',this.userdetail)
    // })

  }

 
  onSubmit() {
    console.log("loginForm", this.loginForm.value.email);
    console.log("loginForm", this.loginForm.value.password);
    let email=this.loginForm.value.email;
    let password=this.loginForm.value.password;
if(this.router.url === '/login'){
  if(this.loginForm.valid){
    this.registerservivce.getUserByEmailAndPassword(email,password).subscribe(x=>{
        this.singleuserdetail=x;
        console.log(this.singleuserdetail);
        if(this.singleuserdetail.length>0){
          if(this.router.url === '/login'){
            this.loginForm.reset();
            this.toaster.success("Login successfully..!","welcome..!");
            localStorage.setItem("roadmaster-user",JSON.stringify(this.singleuserdetail));
            this.router.navigate(['/']);
          }

         

        }else{
          this.toaster.warning("Please enter valid details!");
        }
    })
  }
}
    
  }
  
  

}


















