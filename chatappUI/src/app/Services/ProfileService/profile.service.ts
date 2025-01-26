import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileByIdSubject = new BehaviorSubject<any[]>([]);
  profileById$ = this.profileByIdSubject.asObservable();
  profileById:any;

  private postByIdSubject = new BehaviorSubject<any[]>([]);
  postById$ = this.postByIdSubject.asObservable();
  postsById :any;

  
  baseUrl: string = 'https://localhost:7166/api/Profile/';

  constructor(private http: HttpClient) {}

  getProfileById(): void {
    const connectedUserJson = localStorage.getItem('ConnectedUser');
    if (connectedUserJson) {
      const connectedUser = JSON.parse(connectedUserJson);
      const id = connectedUser.id;

    

      this.http.get<any[]>(`${this.baseUrl}GetProfileById?UserId=${id}`).subscribe(
        (profile) => {
          
          this.profileByIdSubject.next(profile);
        },
        (error) => {
          console.error('Erreur lors de la récupération du profil', error);
        }
      );
    } else {
      console.log("Aucun utilisateur connecté trouvé dans le localStorage.");
    }
  }


  CompleteProfile(item:any) : Observable<any>{
    const connectedUserJson = localStorage.getItem('ConnectedUser');
    var id ;
    if (connectedUserJson) {
      const connectedUser = JSON.parse(connectedUserJson);
      id = connectedUser.id;
    }
    console.log('id',id)
    console.log('item',item)
    return this.http.post<any>(`${this.baseUrl}CompleteProfile?userId=${id}`,item);
 }


 getPostById(): void {
  const connectedUserJson = localStorage.getItem('ConnectedUser');
  if (connectedUserJson) {
    const connectedUser = JSON.parse(connectedUserJson);
    const id = connectedUser.id;

   this.http.get<any[]>(`https://localhost:7166/api/Post/GetAllPostsById?UserId=${id}`).subscribe(
      (post) => {
       
        this.postByIdSubject.next(post);
      },
      (error) => {
        console.error('Erreur lors de la récupération du postes', error);
      }
    );
  } else {
    console.log("Aucun utilisateur connecté trouvé dans le localStorage.");
  }
}


Addpost(item:any) : Observable<any>{
  const connectedUserJson = localStorage.getItem('ConnectedUser');
  var id ;
  if (connectedUserJson) {
    const connectedUser = JSON.parse(connectedUserJson);
    id = connectedUser.id;
  }
  console.log('id',id)
  console.log('item',item)
  return this.http.post<any>(`https://localhost:7166/api/Post/AddPost?UserId=${id}`,item);
}


DeletePost(id:string) {
  
  this.http.delete(`https://localhost:7166/api/Post/DeletePost?postId=${id}`).subscribe(data=>{
     this.getPostById()
  },
error=>{
  console.log("error")
})

}

}
