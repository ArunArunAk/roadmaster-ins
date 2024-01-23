import { Component, OnInit } from '@angular/core';
import { ClaimService } from 'src/app/services/claim.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {
  userdetail!: any;
  userId!: any;
  claimlist!: Array<any>;
  calimlistall!: Array<any>;
  emptycardshow:boolean=false
  tablesshow:boolean=false


  constructor(private claimservice:ClaimService,private registerservice:RegisterService){}

  ngOnInit() {
  this.userdetail = this.registerservice.loginUserId();
    this.userId = this.userdetail.userId;

    this.claimservice.loadClaimData().subscribe(val=>{
      this.calimlistall=val;
      this.claimlist=this.calimlistall.filter(plan => plan.data.userid === this.userId);
      console.log(this.claimlist)
      if(this.claimlist.length > 0){
         this.tablesshow=true
      }else{
        this.emptycardshow=true
      }

    })
  }
}
