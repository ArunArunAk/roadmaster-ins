import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { BikecardComponent } from './cards/bikecard/bikecard.component';
import { AddtocardComponent } from './cards/addtocard/addtocard.component';
import { CarcardComponent } from './cards/carcard/carcard.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostsComponent } from './pages/single-posts/single-posts.component';
import { PostCardSliderComponent } from './layouts/post-card-slider/post-card-slider.component';
import { LoginComponent } from './logincomponents/login/login.component';
import { RegisterComponent } from './logincomponents/register/register.component';
import { authGuard } from './guard/auth.guard';
import { SpinnerComponent } from './spinner/spinner.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './userdashborad/profile/profile.component';
import { PasswordComponent } from './userdashborad/password/password.component';
import { EmailComponent } from './userdashborad/email/email.component';
import { DeleteAccountComponent } from './userdashborad/delete-account/delete-account.component';
import { DashboardComponent } from './userdashborad/dashboard/dashboard.component';
import { AvatarComponent } from './userdashborad/avatar/avatar.component';
import { BikeComponent } from './cal-premium/bike/bike.component';
import { CarComponent } from './cal-premium/car/car.component';
import { CompresivePlansComponent } from './cal-premium/compresive-plans/compresive-plans.component';
import { ShowplanComponent } from './cal-premium/showplan/showplan.component';
import { Showplans2Component } from './cards/showplans2/showplans2.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SuccessFreeComponent } from './cal-premium/success-free/success-free.component';
import { SuccessPaypalComponent } from './cal-premium/success-paypal/success-paypal.component';
import { CompresivePlanCarsComponent } from './cal-premium/compresive-plan-cars/compresive-plan-cars.component';
import { InsuranceareaComponent } from './userdashborad/insurancearea/insurancearea.component';
import { AdminapproveComponent } from './userdashborad/adminapprove/adminapprove.component';
import { AddtocarddashboardComponent } from './userdashborad/addtocarddashboard/addtocarddashboard.component';
import { ClaimprocessComponent } from './userdashborad/claim/claimprocess/claimprocess.component';
import { ClaimComponent } from './userdashborad/claim/claim.component';
// import { Addtocard1Component } from './userdashborad/addtocard1/addtocard1.component';

const routes: Routes = [
  { path: '', component: IndexComponent }, 
  { path: 'home', component: IndexComponent }, 
  { path: 'home-home', component: IndexComponent }, 

  { path: 'claim', component: ClaimprocessComponent,canActivate: [authGuard] }, 


  { path: 'bikecard', component: BikecardComponent,canActivate: [authGuard]  },
  { path: 'addtocard', component: AddtocardComponent,canActivate: [authGuard] },
  { path: 'carcard', component: CarcardComponent,canActivate: [authGuard] },
  { path: 'payment', component: PaymentComponent },
  { path: 'success', component: ConfirmationComponent },
  {path:'blog',component:HomeComponent},
  {path:'spinner',component:SpinnerComponent},
  {path:'user-dashborad',component:ProfileComponent,children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'password', component: PasswordComponent },
    { path: 'email', component: EmailComponent },
    { path: 'delete', component: DeleteAccountComponent },
    { path: 'dashboard', component: DashboardComponent,},
    { path: 'avatar', component: AvatarComponent,},
    { path: 'personalinsurance', component: InsuranceareaComponent,},
    { path: 'adminapprove', component: AdminapproveComponent,},
    { path: 'addtocard1', component: AddtocarddashboardComponent,},
    { path: 'claim', component: ClaimComponent,},








  ],canActivate: [authGuard]},



  
  {path:'category/:category/:id',component:SingleCategoryComponent},
  {path:'post/:id',component:SinglePostsComponent},
  {path:'slider',component:PostCardSliderComponent},
  {path:'login',component:LoginComponent},
  {path:'contact',component:ContactUsComponent},

  {path:'register',component:RegisterComponent},
  {path:'twowheeler-premium',component:BikeComponent,canActivate: [authGuard]},
  {path:'fourwheeler-premium',component:CarComponent,canActivate: [authGuard]},
  {path:'plans',component:CompresivePlansComponent,canActivate: [authGuard]},
  {path:'planscar',component:CompresivePlanCarsComponent,canActivate: [authGuard]},

  {path:'showplan/:bikenumber/:id',component:ShowplanComponent,canActivate: [authGuard]},
  {path:'showplancard/:id',component:Showplans2Component,canActivate: [authGuard]},
  {path:'success-freeinsurance/:id',component:SuccessFreeComponent,canActivate: [authGuard]},
  {path:'success-paypal/:id',component:SuccessPaypalComponent,canActivate: [authGuard]},






  { path: '**', component: NotfoundComponent }, // Wildcard route for not found







];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
