import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-success-free',
  templateUrl: './success-free.component.html',
  styleUrls: ['./success-free.component.css']
})
export class SuccessFreeComponent {
  constructor(private spinner: NgxSpinnerService,private router:Router) {}

  ngOnInit(): void {

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Scroll to the top of the page when navigation ends
          window.scrollTo(0, 0);
        }
      });  

    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide();
    }, 9000);
  }
}
