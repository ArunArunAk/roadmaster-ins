import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FirebaseService } from 'src/app/service/firebase.service';
import { CommentsService } from 'src/app/services/comments.service';
import { InsuranceService } from 'src/app/services/insurance.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-posts',
  templateUrl: './single-posts.component.html',
  styleUrls: ['./single-posts.component.css']
})
export class SinglePostsComponent implements OnInit {
  categorypostarray!: Array<any>;
  singlepostid!: any;
  singlepostview: any;
  singlepostrelatedcategory: any;
  categoryrelatedsidepostarray!: Array<any>;
  commentsarray!: Array<any>;
  commentslength: any;

  constructor(
    private Routerparamsget: ActivatedRoute,
    private postservices: PostService,
    private firebaseservice: FirebaseService,
    private commentservice: CommentsService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private insuranceservice :InsuranceService// Inject the Router,

  ) {}

  ngOnInit(): void {
    // Subscribe to the router events to detect navigation end

    this.spinner.show();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page when navigation ends
        window.scrollTo(0, 0);
      }

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

    });

    this.Routerparamsget.params.subscribe((val) => {
      this.singlepostid = val['id'];
      // this.firebaseservice.countViews(val['id']);
      this.postservices.countviews(val['id']);
      console.log('singlepostvalue', val);
      this.postservices.getPostById(val['id']).subscribe((values) => {
        this.singlepostview = values;
        console.log('singlepostview', this.singlepostview);
        this.singlepostrelatedcategory = this.singlepostview.category.categoryId;
        this.postservices.loadcategoryPosts(this.singlepostrelatedcategory).subscribe((val3) => {
          this.categoryrelatedsidepostarray = val3;
          console.log('categoryrelatedsidepostarray', this.categoryrelatedsidepostarray);

          this.commentservice.loadcomments().subscribe((val: any[]) => {
            console.log('valuuues', val);
            this.commentsarray = val.filter((item) => item.data.postid === this.singlepostid);
            this.commentslength = this.commentsarray.length;
            console.log('specific array', this.commentsarray);
          });
        });
      });
    });
  }
}
