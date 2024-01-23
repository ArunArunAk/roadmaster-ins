

import { Component, AfterViewInit,Input, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';

import Swiper from 'swiper';
import { CardService } from 'src/app/services/card.service';
import { AddtocartService } from 'src/app/services/addtocart.service';
import { PostService } from 'src/app/services/post.service';
import { NgxSpinnerService } from 'ngx-spinner';
SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-post-card-slider',
  templateUrl: './post-card-slider.component.html',
  styleUrls: ['./post-card-slider.component.css'],
})
export class PostCardSliderComponent implements AfterViewInit ,OnInit{
  public productlist: Array<any> = [];
  // public productlist1: Array<any> = [];

  @Input() post: any;
 showspinneranimation=true;


  constructor(private api: CardService,private spinner: NgxSpinnerService, private cartapi: AddtocartService,private postservice:PostService) {}

  ngOnInit(): void {
   
}

  ngAfterViewInit() {
    this.spinner.show()

    this.postservice.loadpost().subscribe((res)=>{
      this.productlist = res;
      setTimeout(() => {
        this.showspinneranimation=false;
        this.spinner.hide();

        this.initSwiper();
        

      });
    })  

    this.api.getProduct().subscribe((res) => {
      console.log("API Data:", this.productlist);
      });
      
  }
  

  private initSwiper() {
    const swiperCards = new Swiper(".card__content", {
      slidesPerView: 2,
      spaceBetween: 36,
      grabCursor: true,
      loop: true,
      autoplay: {
        delay: 2000,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        900: {
          slidesPerView: 3,
        },
        320: {
          slidesPerView: 1,
        },
      },
    });
  }
}


