import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import AOS from 'aos';
import { DeviceDetectorService } from '../services/device-detector.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  showFooter: boolean = true;

  constructor(private router: Router, private deviceDetectorService: DeviceDetectorService) {}

  ngOnInit(): void {
    AOS.init({
      duration: 1000,
      // easing: 'linear',
      // Other options...
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const excludedRoutes = ['/login', '/register', '/user-dashborad', '/user-dashborad/email', '/user-dashborad/password', '/user-dashborad/delete', '/user-dashborad/addtocard', '/user-dashborad/dashboard', '/user-dashborad/avatar', '/user-dashborad/adminapprove', '/user-dashborad/personalinsurance', '/user-dashborad/addtocard1', '/user-dashborad/claim'];
        this.showFooter = !excludedRoutes.includes(event.url);

        // Check if the current route is twowheeler-premium or fourwheeler-premium and if the device is mobile
        if ((event.url === '/twowheeler-premium' || event.url === '/fourwheeler-premium') && this.deviceDetectorService.isMobile()) {
          this.showFooter = false;
        }
      }

      if (this.deviceDetectorService.isMobile()) {
        this.showFooter = false; // Hide the footer for mobile devices
      }
    });
  }
}
