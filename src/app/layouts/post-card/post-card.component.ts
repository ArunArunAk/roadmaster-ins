import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
constructor(){}
@Input() post: any;
// @Input() latestpost: any;



ngOnInit(): void {
  console.log("postarrayspost",this.post);
  // console.log("latestpost",this.latestpost);


}

}
