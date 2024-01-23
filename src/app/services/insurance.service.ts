import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(    private AFS: AngularFirestore,
    ) { }

  loadInsurance(){
    return  this.AFS.collection("insurance").snapshotChanges().pipe(
      map(action =>{
       return action.map(a =>{
        const data=a.payload.doc.data();
        const id=a.payload.doc.id;
          return {id,data};
          
        })
      })
    )
  }

  loadInsuranceusingid(insuranceId: string) {
    return this.AFS.collection("insurance").doc(insuranceId).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data();
        console.log("datadas",data)

        return { data };
      })
    );
  }
  

  loadrandominsurance() {
    return this.AFS.collection("insurance", ref => ref.limit(5)).snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        });
      })
    );
  }
  
 
  loadpolicyusingtype( policyCategory: string) {
    return this.AFS.collection("insurance", ref => 
      ref
        .where('policyCategory', '==', policyCategory)
        .limit(4)
    ).snapshotChanges().pipe(
      map(action => {
        console.log("insurance services")

        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        });
      })
    );
  }
  


}
