import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';
import { BikecardComponent } from './cards/bikecard/bikecard.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchpipePipe } from './pipes/searchpipe.pipe';
import { AddtocardComponent } from './cards/addtocard/addtocard.component';
import { CarcardComponent } from './cards/carcard/carcard.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostsComponent } from './pages/single-posts/single-posts.component';
import { HomeComponent } from './pages/home/home.component';
import { CommentFormComponent } from './comments/comment-form/comment-form.component';
import { CommentListsComponent } from './comments/comment-lists/comment-lists.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';



import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



 import { environment } from '../environments/environment.prod';
 import {  NgxSpinnerService } from 'ngx-spinner';

 import { AngularFireModule } from "@angular/fire/compat";
 import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
 import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import 'firebase/compat/firestore';
import { PostCardComponent } from './layouts/post-card/post-card.component';
import { PostCardSliderComponent } from './layouts/post-card-slider/post-card-slider.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardSliderComponent } from './layouts/card-slider/card-slider.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { LoginComponent } from './logincomponents/login/login.component';
import { RegisterComponent } from './logincomponents/register/register.component'; // <-- import the module
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { SpinnerComponent } from './spinner/spinner.component';
import { ProfileComponent } from './userdashborad/profile/profile.component';
import { NotfoundComponent } from './notfound/notfound.component';
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










@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    FooterComponent,
    BikecardComponent,
    SearchpipePipe,
    AddtocardComponent,
    CarcardComponent,
    PaymentComponent,
    ConfirmationComponent,
    SubscriptionFormComponent,
    SingleCategoryComponent,
    SinglePostsComponent,
    HomeComponent,
     CommentFormComponent,
    CommentListsComponent,
    PostCardComponent,
    PostCardSliderComponent,
    CardSliderComponent,
    LoginComponent,
    RegisterComponent,
    SpinnerComponent,
    ProfileComponent,
    NotfoundComponent,
    PasswordComponent,
    EmailComponent,
    DeleteAccountComponent,
    DashboardComponent,
    AvatarComponent,
    BikeComponent,
    CarComponent,
    CompresivePlansComponent,
    ShowplanComponent,
    Showplans2Component,
    ContactUsComponent,
    SuccessFreeComponent,
    SuccessPaypalComponent,
    CompresivePlanCarsComponent,
    InsuranceareaComponent,
    AdminapproveComponent,
    AddtocarddashboardComponent,
    ClaimprocessComponent,
    ClaimComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule   ,
    CarouselModule.forRoot(),
    NgbModule,
    NgbCarouselModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot(),




  ],
  providers: [],
  bootstrap: [AppComponent,ToastrModule]
})
export class AppModule { }
