


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../services/register.service';
import Swal from 'sweetalert2';

// import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private router: Router,private registerservice: RegisterService,private toaster:ToastrService){};
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      console.log('CanActivate called');
    if ( this.registerservice.isloggedinmethod()){

      return true
    } else {
      
       Swal.fire({
        icon: 'warning',
        title: 'Access Denied',
        html: 'Please log in to access this page.<br/><button class="btn btn-primary mt-2" id="loginButton">Login</button>',
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCloseButton: true, 

        customClass: {
          htmlContainer: 'swal2-html-container-small', // Add custom CSS class for reduced size
        }
      });

      document.getElementById('loginButton')?.addEventListener('click', () => {
        this.router.navigate(['/login']);
        Swal.close();
      });

      return false;
    }
  }
  
} 