import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-paypal',
  templateUrl: './success-paypal.component.html',
  styleUrls: ['./success-paypal.component.css']
})
export class SuccessPaypalComponent implements OnInit {
  id!: any;

  constructor(private route: ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    // Retrieve the id parameter from the URL

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Scroll to the top of the page when navigation ends
          window.scrollTo(0, 0);
        }
      });  

    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', this.id);
  }
}
