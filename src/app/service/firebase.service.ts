// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class FirebaseService {

//   constructor() { }
// }
// firebase.service.ts

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Ensure you import the correct module
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firebaseConfig = {
    apiKey: "AIzaSyBLS_3-xbXvJF5lj1RLhimXDHzo6huKhBQ",
    authDomain: "roadmaster-blog.firebaseapp.com",
    projectId: "roadmaster-blog",
    storageBucket: "roadmaster-blog.appspot.com",
    messagingSenderId: "614943310930",
    appId: "1:614943310930:web:70b3959b831b0598920b8b"
  };

      

  private firebaseApp: firebase.app.App;

  constructor(private afs: AngularFirestore) {
    // Initialize Firebase
    this.firebaseApp = firebase.initializeApp(this.firebaseConfig);
  }

  countViews(postId: any) {
    const viewsCount = {
      views: firebase.firestore.FieldValue.increment(1),
    };

    const auth = this.firebaseApp.auth();

  

    this.afs.collection("post").doc(postId).update(viewsCount);
  }
}
