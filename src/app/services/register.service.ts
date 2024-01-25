import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { login } from 'src/models/login';
import { register } from 'src/models/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private AFS:AngularFirestore,private toastr: ToastrService,private router:Router,private storage: AngularFireStorage) { }


  //post data
  savedata(data:any){
    this.AFS.collection("user-registration").add(data).then(docRef =>{  
      this.toastr.success( "ur registration  Successfully..!","pls login");
      this.router.navigate(['/login']);
      console.log(docRef);
     })
     .catch(err => {
      console.log(err);
     })
  
  }
  //get data
  getUserByEmail(email: string) {
    return this.AFS
      .collection('user-registration', (ref) => ref.where('email', '==', email))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
  
  getUserByEmailAndPassword(email: string, password: string) {
    return this.AFS
      .collection('user-registration', (ref) => ref.where('email', '==', email).where('password', '==', password))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  
  
  
  
  loadData(){
    return  this.AFS.collection("user-registration").snapshotChanges().pipe(
      map(action =>{
       return action.map(a =>{
  
        const data=a.payload.doc.data();
        const id=a.payload.doc.id;

         

            return {id,data};
        })
      })
    )
  }
  load(){
    return  this.AFS.collection("user-registration").snapshotChanges().pipe(
      map(action =>{
       return action.map(a =>{
  
          const data=a.payload.doc.data() as login;
          const id=a.payload.doc.id;
          const email = data.email;
  
            return {email};
        })
      })
    )
  }
  checksubs(subscriberEmail:any){
    return this.AFS.collection('user-registration',ref => ref.where('email', '==',subscriberEmail)).get()
  }
  upateData(id:any,editdata:any){
   this.AFS.collection("user-registration").doc(id).update(editdata).then(docred=>{
    this.toastr.success( "ur deatil Editted Successfully..!");
  
   })
  }
  
  Deletedata(categoryid:any){
    this.AFS.collection("user-registration").doc(categoryid).delete().then(docred=>{
      this.toastr.success( "ur detail Delete Successfully..!");
  })
  }

  isloggedinmethod(){
    return localStorage.getItem('roadmaster-user')!=null;
}

logout(){
  console.log("logout1")

  localStorage.removeItem('roadmaster-user');

}

loginUserId(){
  const userDetailString = localStorage.getItem('roadmaster-user');
  const userDetailArray = userDetailString ? JSON.parse(userDetailString) : [];
   const username = userDetailArray.length > 0 ? userDetailArray[0].data.firstname : null;
   console.log(username);
   const lastname = userDetailArray.length > 0 ? userDetailArray[0].data.lastname : null;
   console.log(lastname);
   const email = userDetailArray.length > 0 ? userDetailArray[0].data.email : null;
   console.log(email);
   const userId = userDetailArray.length > 0 ? userDetailArray[0].id : null;
   console.log(userId);

   return { username, userId ,lastname,email};}



   updateemail(id:any,email:any){
    this.AFS.collection("user-registration").doc(id).update(email).then(docred=>{ 
      this.toastr.info("email  updated!", "email", { positionClass: 'toast-top-right' });
  
     })
  
   }

   updatepassword(id:any,password:any){
    this.AFS.collection("user-registration").doc(id).update(password).then(docred=>{ 
      this.toastr.info("password  updated!", "password", { positionClass: 'toast-top-right' });
  
     })
  
   }

   getRegisterusingId(userId: string) {
    return this.AFS.collection("user-registration").doc(userId).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data()  as register
        return {  data };
      })
    );
  }

  deleteRegisterUsingId(userId: string) {
    this.toastr.success("delete succesfully")
    return this.AFS.collection("user-registration").doc(userId).delete();
  }
 
  uploadImage(selectedimg: any,userid:any){
    const filepath = `UserIMG/${Date.now()}`;
    console.log('filepath', filepath)

    this.storage.upload(filepath, selectedimg).then(() => {
      console.log("user image upload successfully");
      this.toastr.success("user image upload succesfully")

      this.storage.ref(filepath).getDownloadURL().subscribe(URL => {
        console.log('Url', URL);
        const urlupdated={
          userImage:URL
        }

        this.updateimage(userid,urlupdated)
         
     
      });
    });
  }


  updateimage(userid:any,urlupdated:any){
    this.AFS.collection("user-registration").doc(userid).update(urlupdated).then(docred=>{ 
  
     })
}


}
  