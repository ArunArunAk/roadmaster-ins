import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postarray!:Array<any>;
  latestpostarray!:Array<any>;
  showspinneranimation=true;



  constructor(private postservice:PostService,private spinner: NgxSpinnerService,private router:Router){
    
  }

 ngOnInit(): void {

  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      // Scroll to the top of the page when navigation ends
      window.scrollTo(0, 0);
    }
  });

  this.spinner.show()

    this.postservice.loadpost().subscribe(val=>{
      this.postarray=val;
      setTimeout(() => {
        this.showspinneranimation=false;

        this.spinner.hide();
      })
      console.log(val);
    });

    this.postservice.Latestpost().subscribe(val=>{
      this.latestpostarray=val;
      console.log(val);
      
    })

   
 }
 
}
