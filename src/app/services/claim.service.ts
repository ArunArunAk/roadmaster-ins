import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private AFS:AngularFirestore,private toastr: ToastrService,private router:Router) { }
  addClaim(data:any){
    this.AFS.collection("claim").add(data).then(docRef =>{  
      this.toastr.success("claim successfully submitted ",'check dashboard')
      console.log(docRef);
     })
     .catch(err => {
      console.log(err);
     })
  
  }

   loadClaimData(){
    return  this.AFS.collection("claim").snapshotChanges().pipe(
      map(action =>{
       return action.map(a =>{
  
        const data=a.payload.doc.data();
        const id=a.payload.doc.id;

         

            return {id,data};
        })
      })
    )
  }}
