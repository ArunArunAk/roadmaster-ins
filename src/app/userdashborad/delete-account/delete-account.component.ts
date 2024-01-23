// delete-account.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { take, timer } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit{

  userdetail:any;
  userid:any;
  showNavbar=true;


  constructor(private regsiterservices:RegisterService,private spinner: NgxSpinnerService,private router:Router){}
  ngOnInit(): void {
    this.userdetail=this.regsiterservices.loginUserId();
   this.userid=this.userdetail.userId
  }
  
  cancel() {

  }

  confirmDelete() {
    this.spinner.show();
  
    timer(2000).pipe(take(1)).subscribe(() => {
      this.spinner.hide();
      this.router.navigate(['/']);
      this.regsiterservices.logout()
      this.regsiterservices.deleteRegisterUsingId(this.userid);

    }); 
  }
}
