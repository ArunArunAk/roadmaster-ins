import { Component, Input, OnInit } from '@angular/core';
// import { comments } from 'src/app/models/comments';
import { CommentsService } from 'src/app/services/comments.service';
import { comments } from 'src/models/comments';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() id: any;
  constructor(private commentsservice:CommentsService){}
 

ngOnInit(): void {}

onSubmit(forms:any){
  console.log(forms)
  let commentsdata: comments = {
    username: forms.value.name,
    comments:forms.value.comment,
    postid:this.id,
    viewstatus:false,
    date:new Date()

  };
  console.log('commets',commentsdata)

    this.commentsservice.saveComments(commentsdata);
     forms.reset();
}


}