import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserinsurancedetailService {

  constructor(private AFS:AngularFirestore,private toastr: ToastrService,private router:Router) { }
  UserOfInsurancedetailofData(data:any){
    this.AFS.collection("userofinsurancedetail").add(data).then(docRef =>{  
      this.toastr.success( "pls waiting few seconds..");
      console.log(docRef);
     })
     .catch(err => {
      console.log(err);
     })
  
  }

   loadData(){
    return  this.AFS.collection("userofinsurancedetail").snapshotChanges().pipe(
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
