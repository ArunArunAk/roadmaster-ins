import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private AFS:AngularFirestore) { }

   saveComments(data: any) {
    this.AFS.collection("comments").add(data)
          .then(docRef => {
            alert("Comments added successfully");
            console.log(docRef);
          })
   }


   loadcomments(){
    return  this.AFS.collection("comments").snapshotChanges().pipe(
      map(action =>{
       return action.map(a =>{
  
          const data=a.payload.doc.data();
          const id=a.payload.doc.id;
            return {id,data};
        })
      })
    )
  }
}
