import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorynavService {

  constructor(private AFS:AngularFirestore) { }


  loadData(){
    return  this.AFS.collection("categories").snapshotChanges().pipe(
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
