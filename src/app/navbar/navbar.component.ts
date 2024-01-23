import { Component, OnInit,OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { AddtocartService } from '../services/addtocart.service';
import { Router, NavigationEnd } from '@angular/router';
import { CategorynavService } from '../services/categorynav.service';
import { RegisterService } from '../services/register.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { take, timer } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnChanges,DoCheck{
  public count=0;
  searchterm!:string;
 currenturl:any;
 navArray!:Array<any>;
  showNavbar: boolean = true;

  username!:any;
  userId!:any;
  isLoggedIn!:boolean;



 

 constructor(private cardapi:AddtocartService,private router: Router,private categoryservice:CategorynavService,private registerservice:RegisterService,private spinner: NgxSpinnerService){
   console.log("current url",this.router.url)
   this.currenturl=router.url;
   console.log("uurrl",this.currenturl)
 
   this.cardapi.getproduct().subscribe(a=>{
     this.count=a.length;
   });
   
 
 }
 ToggleNavBar () {
  let element: HTMLElement = document.getElementsByClassName( 'navbar-toggler' )[ 0 ] as HTMLElement;
  if ( element.getAttribute( 'aria-expanded' ) == 'true' ) {
      element.click();
  }
}
 navigateToPage(route: string) {
  this.router.navigate([route]);
}
 ngOnInit(): void {

  // const userDetailArray=JSON.parse(localStorage.getItem('roadmaster-user')!)
 

  this.categoryservice.loadData().subscribe(val=>{
    this.navArray=val;
    console.log(this.navArray)
  });

  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.showNavbar = !['/login', '/register','/user-dashborad','/user-dashborad/email','/user-dashborad/password','/user-dashborad/delete','/user-dashborad/addtocard','/user-dashborad/dashboard','/user-dashborad/avatar','/user-dashborad/personalinsurance','/user-dashborad/adminapprove','/user-dashborad/addtocard1','/user-dashborad/claim'].includes(event.url);
    }
  });
 
  
}
ngDoCheck(): void {
  const userDetailString = localStorage.getItem('roadmaster-user');
  const userDetailArray = userDetailString ? JSON.parse(userDetailString) : [];
   this.username = userDetailArray.length > 0 ? userDetailArray[0].data.firstname : null;
  //  console.log(this.username);
   this.userId = userDetailArray.length > 0 ? userDetailArray[0].id : null;
  //  console.log(this.userId);

  this.isLoggedIn=this.registerservice.isloggedinmethod()
  // console.log(this.isLoggedIn)
}
 search(event:any){
 // console.log(event);
 this.searchterm=(event.target as HTMLInputElement).value;
 console.log("searchterm",this.searchterm);
 this.cardapi.search.next(this.searchterm);
 
 
 }
 logout(){
  
  this.spinner.show();

  // Simulate a 2-second delay using RxJS timer
  timer(2000).pipe(take(1)).subscribe(() => {
    // Hide the spinner after 2 seconds
    this.spinner.hide();

    // Perform actual logout
    this.registerservice.logout();
  }); }
ngOnChanges(changes: SimpleChanges): void {
 
}
 
}



