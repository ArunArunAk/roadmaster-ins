import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  userdetail!:any;
  userid!:any
  userAvatar: string = 'path-to-default-avatar';  // Provide a default avatar path or URL
  imgSrc: any = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_u0yJIU-lAFEFGT7mhyXNysTmsyggJ-e1IL-FLtUQDlpJOQFrvjsRVGIELekv1sQ0o7Q&usqp=CAU';
  selectedImg: any;
  postForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService) {
    this.postForm = this.formBuilder.group({
      postimg: [null, Validators.required],  // Set initial value to null
      // Add other form controls if needed
    });
  }

  ngOnInit() {
    this.userdetail=this.registerService.loginUserId();
    this.userid=this.userdetail.userId  }

  showPreview(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
      };
      reader.readAsDataURL(file);
      this.selectedImg = file;
      console.log('Selected image:', this.selectedImg);
    }
  }

  get fc() {
    return this.postForm.controls;
  }

  onSubmits() {
    console.log('Image upload success');
    this.registerService.uploadImage(this.selectedImg,this.userid);
    this.imgSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_u0yJIU-lAFEFGT7mhyXNysTmsyggJ-e1IL-FLtUQDlpJOQFrvjsRVGIELekv1sQ0o7Q&usqp=CAU';
  }
}
