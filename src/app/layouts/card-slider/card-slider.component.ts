import { Component, OnInit } from '@angular/core';
import { CategorynavService } from 'src/app/services/categorynav.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.css']
})
export class CardSliderComponent implements OnInit {
  latestpostarray!:Array<any>;
  navArray!:Array<any>;

  
  title="pagnitaion";
  posts:any;
  page:number=1;
  count:number=0;
  tablesize:number=4;
 tablesizes:any=[5,10,15,20];


  constructor(private postservice:PostService,private categoryservice:CategorynavService){}

 ngOnInit(): void {
  this.Loadlatestposts();
  this.categoryservice.loadData().subscribe(val=>{
    this.navArray=val;
    console.log(this.navArray)
  })
 }

 ontabledatachange(event:any){
   this.page=event;
   this.Loadlatestposts();
 }
 ontablesizechange(event:any){
    this.tablesize = event.target.value;
    this.page=1;
    this.Loadlatestposts();

 }
 Loadlatestposts(){
  this.postservice.Latestpost().subscribe(val=>{
    this.latestpostarray=val;
    console.log(val);
  })
 }
}
