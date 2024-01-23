import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { InsuranceService } from 'src/app/services/insurance.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {
   title:any;
  categorypostarray!:Array<any>;
  constructor(private Routerparamsget:ActivatedRoute,private postservices:PostService,private spinner: NgxSpinnerService,
    private insuranceservice :InsuranceService){

  }

  ngOnInit(): void {
    this.spinner.show()
     this.Routerparamsget.params.subscribe(val=>{
      console.log("params",val);
      this.title=val;
      this.postservices.loadcategoryPosts(val['id']).subscribe(posts=>{
        this.categorypostarray=posts;
        console.log("categorypostarray",this.categorypostarray)
   })
     })
     this.insuranceservice.loadInsurance().subscribe(
      (val) => {
        let latestpostarray: Array<any> = val;
        console.log(latestpostarray);
        
        this.spinner.hide();
      },
      (error) => {
        console.error('Error loading insurance:', error);
        this.spinner.hide();
      }
    );
  }

}
