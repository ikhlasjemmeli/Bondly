import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
baseUrl='https://localhost:7166/api/User'

private UsersSubject  =new BehaviorSubject<any[]>([]);
Users$ = this.UsersSubject.asObservable();
Users:any;

constructor(private http :HttpClient, private toastr :ToastrService, private router:Router) { }

showSuccess() {
  this.toastr.success('Registration successful!', 'Success');
}
showError() {
  this.toastr.error('Registration failed. Please try again.', 'Error');
}
  GetAllUsers(){
    this.http.get<any[]>(`${this.baseUrl}/GetAllUsers`).subscribe(
     data=>{
     this.UsersSubject.next(data);
     },
     error=>{
      console.log('error :',error);
      
     }
    )
  }


  SignUp(item :any){
   return this.http.post<any>(`${this.baseUrl}/Sign Up`,item).subscribe(
      data=> {
        this.GetAllUsers();
        this.showSuccess();
      },
      error=>{
        if (error.status === 400 && error.error.message) {
          this.toastr.error(error.error.message, 'Error');
        } else {
          this.showError();
        }
      }
    )
  }

  Login(item :any) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/Authenticate`, item) 
  }

  DeleteAccount() : Observable<any>{
    const connectedUserJson = localStorage.getItem('ConnectedUser');
    var id ;
    if (connectedUserJson) {
      const connectedUser = JSON.parse(connectedUserJson);
      id = connectedUser.id;
    }
    return this.http.delete(`${this.baseUrl}/DeleteAccount?userId=${id}`)

  }

  editPassword(item: any): Observable<any> {
    const connectedUserJson = localStorage.getItem('ConnectedUser');
    let id: any;
    if (connectedUserJson) {
      const connectedUser = JSON.parse(connectedUserJson);
      id = connectedUser.id;
    }
  
    return this.http.put(`${this.baseUrl}/UpdatePassword?userId=${id}`, item, {
      responseType: 'json',
    });
  }
  
}
