import { AfterViewInit, Component, DoCheck, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { take, timer } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit,AfterViewInit {
  title = 'admindashboard';
  showNavbar=true;
  userdetail:any;
  username:any;
  userid:any
  userarray:any;
  imgSrc:any='data:image/png;base64,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'

  constructor(private el:ElementRef,private registerservice:RegisterService,private spinner: NgxSpinnerService,private route:Router){}
  ngOnInit(): void {

   this.userdetail=this.registerservice.loginUserId();
   this.username=this.userdetail.username;
   this.userid=this.userdetail.userId
   console.log(this.username)
   console.log(this.userid)
   console.log(this.userdetail)


   this.registerservice.getRegisterusingId(this.userid).subscribe(val=>{
    this.userarray=val;
    if(this.userarray.data.userImage ===''){
      this.imgSrc='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAACUCAMAAACp1UvlAAAAY1BMVEVVYIDn7O3///9TXn9QW31LV3rr8PBEUXbv9PTM0thGU3dha4iJkaS4v8hCT3U/THJaZYT4+fro6e2fpbVzfJVncIyYna+2usbZ3+JsdZDc3uTW2N+Di6B8hJuSmKvEyNGssr+v+DStAAAH0ElEQVR4nO2c6a6jOgyAQ+OEre1ha1lbeP+nvAG6QgA7BTQ/rjUjnZGm6Xccx7GdxOxgLmFUptckEAKAM6b+qL+cAYAAv4rrIgrNx2amH4zSexKAJ1qksXAQHvi3uDZFM+KK3Dv8eXqiDzYOYP/5Tensw+XefSEWmN4CHiRxsTVXWFxte0lRI72JvyCNtuSqKy5ITC82z7+SlEbgilLugRFVRwbn3MWvAjRX2Fw82vyNBLybuzJXmLJfqToyOy/X5HKTNag6MnFErQAMV1HZ5nY1FOVxY4SZIbhOzGwNToqXLE/mIleUrzWFb4FzLH/kSv31pvBDvMuClc1zybu9urJ6AdGYc0UXbxuqVs7XOfOf46r5JnP4FOHPzOUMV7rVHD4F/Ol1Oc11X38dDoV7NZUrvJ63pmpFpDSuMNnQ4j/FnliWeq6wImC1sfz5rCJ9lXCon+ypmF8vE/5CyxUm2J2Hq9Qnr+KmdrMss6wiK91Tc71dAoFeymctmI4rPNrI3/XsX0+lJR1HSml1on5Q/4rc5iiwm73WxjRc4RGlLS6Cu2s9eQbScp4ShiLjZ82q1HDFKG2pvbd09FAPcaR7w7lAPvZjY64Uoy0uqmwW6qG12keNxkeef8RVYlJDDs28rl46y46YlQ35MPcdckUBwiaAuQ6GqiOLMRoTVTjPdUNg8aBGY6nJjDEaG3qLARdqDKhRc/jS2B2jMShnuFzMCF5M0FarMCvB2EYeTnLJC2aAG4mqBSsx3kLcJ7nuqFl0SbPYinNF2b47wYWaRbjRZrFTWBYgNAYXqeUKc8y2YdOM/gF2xwztxVquBjOLPKdTKa4aw8Wh0HBFqKgJrgbqUoKZSAZv7/rmQqmawcmIy6lQo7/j/RdXgQtuOH01dlyo3UiZ/ogLswEpCTITLGVguFBTnAZcJS6g576ZeUkXNz4k4TfXEacus+XYciGDarv+4iqQBfnNuSD44kJt+S3XxZQLm/g9dqOey0HnZb4pFzLFYnAM31zNv8PFePHicjAB0l5c/S7ZcZX4X2YHfcGLC5fI7sTFPPfJhS8L7sEF1wdXjS/e7MGlfGTPhYpy9+Niouy4ohxfrtqH695x4SKcHbk477hQ8fOeXOwvarnQTnU3Li9tuSiF53244K64in24SN+ShAxXh3uKOJrFq1ZGOpcLIna4Ej4AiWXIJV1OKZ6XLEQmHK2YZkOt4GoUD/FSJgleFRJ6beIlGf7uDBNXVuB/CyaIla9vIfgjSFhJUK9tlmw/BJdyd8IDVhMW8G9cyFSwE8FSwi60JxeucLA3FzBs5rg3F8F97cjFGcF97cjFmE/4v3vqK/gnuWjyPxdNvHSnfUgJxb5227cZbT3y3FxfMqPdFLkQ/BfnJocwvZDiQiU3yu0guCBO2/VYqJOYtwYYzRpFZRTgS8f1SbejgBRPtB8wKvxmMSGI7rkoVYBW7JKsMOmiblF8imDIA5L3Jxqyr5BEk++40IX1h5jkRJSYpRfOCvJnqCdXklCPfGLlLKItFKWwlKgw5Nnjp4gjKd/uuYj3FGRJfHehxGsY9iTt40O0YoCM6XGEqBn+DOb1oYo0kag7CkMp2IFUMWuFA2UzclBXfgbfkEt2CMkXVUl3AjKDaBCObR2TrGdOOOSWlPLaU0TcchF3SEaxMPQ57Zeci5aLbGCMo5ekg7pbMxz+rz/voHrW1odFOHVRo4JORNWfDxkkKrjdW7omPkKlXT3XyWAlC4yvQN1zG4/dvhdouSTZwNorPggsA9fFHreHunNRWgbVi7guzaRDOhn4GDl9ntdSapkv+VuaSIe+X3dyDp9cESVZe3EtTaNjlve3q/F5f8LEKW/F5ZVvrsLAQDfigtvHfRMTy9+I6/FK4MFFzT424+IQfnKFdIVtw2XH3/fSarKv2YSLB9HgfiF5896ESzyv1r64qHn3JlycOUMuar7GxaK/pwcT79dX73u1qFvbb4F8cX+kZqZqTDnmOlQksOVaq0MOCsX7IdEHV0TROw/KJfuyMuJagttBx0W6sWA3y3Gh05DWEueFnuuATxJEhUk8HPT7u27MzycxX1wFMmICL0ZQtXLEv4WF5DDFhatVcJGjy+WyCbA3iaGY5jrcFsG4d2kkvnDiWLGPIhu8NhxwLT0D4xDEEa3MJLMYobM+Sp3kOpSzXIJfM3p51Ykaf+FxM1ycea5DOr22AY6F0XGH0lkzO5t89AJy/P5x6nET2JWLe1w4obOZPiT26MXomCvU2j5AXpvesXoozZpcm5o3yZp3rJoaDLeTk7muXjqz9Do7x2MI3XvkaHC3TS3C5jddvXSWNWyks9GbzCmugbcQfmz9ck77JUpngwYg3lHX70H/3r14g4E4ZhOPoc1EZumnzkSibUMx0R/gqTGAysBhLYA5Vpo/yWyttqb7KRStjamd0F3HsIZoWdqvTU9nW3NcalUKCFZYhFNkVsNBuxIXuA7OLS/XnsJPMMdN7Ems2f4mm0zhB5k100Vqth9MuCmXZdoPZluw+Y5DS/2GNpvKhd5Ri/2ZtlGZXGpptdzPKtxAZcudAzH9v1Z3+Ov0/zqsbGWo5nfYvnfrBRS478P341snAMN2CiT0L/ydzNmgf+HvZAQqet9O0wADPYGGXEppBkuApCpDrg6NoDVp0n7VuF9tiFObExo2rP0PvBqASvA5YggAAAAASUVORK5CYII='
    }else{
      this.imgSrc=this.userarray.data.userImage

    }
    console.log(this.userarray.data.userImage)
})
     


    let alldrpdwn = document.querySelectorAll('.dropdow-container');
    console.log(alldrpdwn,'alldrpdwn#');
    alldrpdwn.forEach((item:any)=>{
      const a = item.parentElement?.querySelector('a:first-child');
      console.log(a,'a#');
      a.addEventListener('click',(e:any)=>{
          e.preventDefault();
          this.el.nativeElement.classList.toggle('active');
          item.classList.toggle('show');
      });
      
    });

  }
ngAfterViewInit(): void {
  
}

  // responsivemenu 
  responsiveMenu:any;
  // responsivemaincontent
  responsiveContent:any;
  defaultStatus=true;
  openNav(status:any)
  {
    if(status===this.defaultStatus)
    {
      this.responsiveMenu = {
        'display':'block'
      }
      this.responsiveContent={
        'margin-left':'150px'
      }
      this.defaultStatus = false;
    }else
    {
      this.responsiveMenu = {
        'display':null
      }
      this.responsiveContent={
        'margin-left':null
      }
      this.defaultStatus=true;
    }

  }

  logout(){
  
    this.spinner.show();
  
    timer(2000).pipe(take(1)).subscribe(() => {
      this.spinner.hide();
      this.route.navigate(['/']);

      this.registerservice.logout();
    }); }

}