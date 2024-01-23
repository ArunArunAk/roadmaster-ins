import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

// import * as firebase from 'firebase';
import firebase from 'firebase/compat/app';
import  'firebase/auth';

// import 'firebase/compat/firestore'; // import the firestore module



@Injectable({
  providedIn: 'root'
})
export class PostService implements OnInit {

  constructor(private AFS:AngularFirestore) { }
 ngOnInit(): void {
  
 }
  loadpost(){
    return  this.AFS.collection("posts",ref=>ref.where('isFeautured', '==',true).limit(5)).snapshotChanges().pipe(
      map(action =>{
       return action.map(a =>{
  
        const data=a.payload.doc.data();
        const id=a.payload.doc.id;
          return {id,data};
          
        })
      })
    )
  }

  Latestpost(){
    return  this.AFS.collection("posts",ref=>ref.orderBy('createAt')).snapshotChanges().pipe(
      map(action =>{
       return action.map(a =>{
  
        const data=a.payload.doc.data();
        const id=a.payload.doc.id;
          return {id,data};
          
        })
      })
    )
  }


loadcategoryPosts(categoryids:any){
  return  this.AFS.collection("posts",ref=>ref.where('category.categoryId', '==',categoryids).limit(4)).snapshotChanges().pipe(
    map(action =>{
     return action.map(a =>{

      const data=a.payload.doc.data();
      const id=a.payload.doc.id;
        return {id,data};
        
      })
    })
  )
}

getPostById(postId: any){
  return this.AFS.collection('posts').doc(postId).valueChanges();
   
}

countviews(postId: string | undefined) {
  const viewscount = {
    views: firebase.firestore.FieldValue.increment(1)
  };

  this.AFS.collection("posts").doc(postId).update(viewscount).then(() => {
    console.log("Views count is updated");
  }).catch(error => {
    console.error("Error updating views count:", error);
  });
}

//  countviews(postId: string | undefined){
//   const viewscount={
//       // views:firebase.default.firestore.FieldValue.increment(1)
//       views:firebase.default.firestore.FieldValue.increment(+1)

//   }
//     this.AFS.collection("post").doc(postId).update(viewscount).then(()=>{
//       console.log("vies count is updated")
//     })
//  }

}
