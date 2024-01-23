import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-lists',
  templateUrl: './comment-lists.component.html',
  styleUrls: ['./comment-lists.component.css']
})
export class CommentListsComponent implements OnInit {

  @Input() commandslists: any; // Assuming commandslists is the correct property name
  
constructor(){

}
ngOnInit(): void {
  
}
}
