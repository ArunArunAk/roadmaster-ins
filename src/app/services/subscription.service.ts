import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private AFS: AngularFirestore, private toastr: ToastrService) { }

  savesubscribers(data: any) {
    this.AFS.collection("subscribers").add(data)
      .then(docRef => {
        console.log(docRef);
        console.log('add subscriber success');
        this.toastr.success('Subscriber added successfully', 'Success');
      })
      .catch(error => {
        console.error('Error adding subscriber: ', error);
        this.toastr.error('Failed to add subscriber', 'Error');
      });
  }
  checksubs(subscriberEmail:any){
    return this.AFS.collection('subscribers',ref => ref.where('email', '==',subscriberEmail)).get()
  }
}
