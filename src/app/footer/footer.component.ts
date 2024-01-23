import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import AOS from 'aos';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  showFooter: boolean = true;

constructor(private router:Router){

}
ngOnInit(): void {

  AOS.init({
    duration: 1000,
    // easing: 'linear',
    // Other options...
  });

  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.showFooter = !['/login', '/register','/user-dashborad','/user-dashborad/email','/user-dashborad/password','/user-dashborad/delete','/user-dashborad/addtocard','/user-dashborad/dashboard','/user-dashborad/avatar','/user-dashborad/adminapprove','/user-dashborad/personalinsurance','/user-dashborad/addtocard1','/user-dashborad/claim'].includes(event.url);
    }
  });
}
}
