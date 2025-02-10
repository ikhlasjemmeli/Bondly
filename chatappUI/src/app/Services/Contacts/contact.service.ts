import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private UsersSubject =new BehaviorSubject<any[]>([]);
  Users$ =this.UsersSubject.asObservable();
  Users:any;

  private BlockedUsersSubject =new BehaviorSubject<any[]>([]);
  BlokedUsers$ =this.BlockedUsersSubject.asObservable();
  BlokedUsers:any;

  private FriendSubject =new BehaviorSubject<any[]>([]);
  Friends$ =this.FriendSubject.asObservable();
  Friends:any;

  baseUrl = 'https://localhost:7166/api/User/'
  constructor(private http:HttpClient) { }

  getAllUsers(){
    const connectedUserJson = localStorage.getItem('ConnectedUser');
    let id: any;
    if (connectedUserJson) {
      const connectedUser = JSON.parse(connectedUserJson);
      id = connectedUser.id;
    }
    this.http.get(`${this.baseUrl}GetAllContacts?userId=${id}`).subscribe( 
      (data:any)=>{
        this.UsersSubject.next(data);
      
      }, error=>{
        console.log("error:", error.error)
      }
    )
  }

  AddFriendRequest(receiverId:string){
    const connectedUserJson = localStorage.getItem('ConnectedUser');
    let id: any;
    if (connectedUserJson) {
      const connectedUser = JSON.parse(connectedUserJson);
      id = connectedUser.id;
   
    const FriendRequest ={senderId:id,receiverId:receiverId}
    this.http.post<any[]>('https://localhost:7166/api/FriendRequest/AddFriendRequest',FriendRequest).subscribe(data=>{
      console.log("success");
    },
  error=>{
    console.log(error.error)
  })
  }
  }



DeleteRequest(receiverId: string): Observable<any> {
  const connectedUserJson = localStorage.getItem('ConnectedUser');
  let id: any;

  if (connectedUserJson) {
    const connectedUser = JSON.parse(connectedUserJson);
    id = connectedUser.id;
  
    const FriendRequest = { senderId: id, receiverId: receiverId };
    return this.http.request('DELETE', 'https://localhost:7166/api/FriendRequest/DeleteRequest', {
      body: FriendRequest,
    });
  }
  
  return of(null); // Retourne un observable vide si `ConnectedUser` n'est pas trouvé
}



unfriend(fiendId:string){
  const connectedUserJson = localStorage.getItem('ConnectedUser');
  let id: any;
  if (connectedUserJson) {
    const connectedUser = JSON.parse(connectedUserJson);
    id = connectedUser.id;
 
  
  this.http.delete(`https://localhost:7166/api/FriendRequest/DeleteFriend?UserId=${id}&friend=${fiendId}`).subscribe(
    () => {
      console.log("Suppression réussie !");
    },
    error => {
      console.error("Erreur lors de la suppression :", error.error);
    }
  );
}
}

blockUser(blockedId:string){
  const connectedUserJson = localStorage.getItem('ConnectedUser');
  let id: any;
  if (connectedUserJson) {
    const connectedUser = JSON.parse(connectedUserJson);
    id = connectedUser.id;
 
 
  this.http.post<any[]>(`https://localhost:7166/api/FriendRequest/blockUser?userId=${id}&blockedId=${blockedId}`,{}).subscribe(data=>{
    console.log("success");
  },
error=>{
  console.log(error.error)
})
}
}


getBlockedUsers(){
  const connectedUserJson = localStorage.getItem('ConnectedUser');
  let id: any;
  if (connectedUserJson) {
    const connectedUser = JSON.parse(connectedUserJson);
    id = connectedUser.id;
 
  this.http.get(`https://localhost:7166/api/FriendRequest/GetAllBlocked?userId=${id}`).subscribe(
    (data:any)=>{
      this.BlockedUsersSubject.next(data);
      
    
    }, error=>{
      console.log("error:", error.error)
    }
  )
}}

unblock(blockedId:string){
  const connectedUserJson = localStorage.getItem('ConnectedUser');
  let id: any;
  if (connectedUserJson) {
    const connectedUser = JSON.parse(connectedUserJson);
    id = connectedUser.id;
 
  
  this.http.delete(`https://localhost:7166/api/FriendRequest/UnblockUser?userId=${id}&blockedId=${blockedId}`).subscribe(
    () => {
      console.log("Suppression réussie !");
    },
    error => {
      console.error("Erreur lors de la suppression :", error.error);
    }
  );
}
}

getAllFriends(){
  const connectedUserJson = localStorage.getItem('ConnectedUser');
  let id: any;
  if (connectedUserJson) {
    const connectedUser = JSON.parse(connectedUserJson);
    id = connectedUser.id;
  this.http.get(`https://localhost:7166/api/FriendRequest/getAllFriends?UserId=${id}`).subscribe(
    (data:any)=>{
      this.FriendSubject.next(data);
    
    }, error=>{
      console.log("error:", error.error)
    }
  )
}}


ReplyToRequest(response:boolean, userId:any): Observable<any> {
  const connectedUserJson = localStorage.getItem('ConnectedUser');
  let id: any;
  if (connectedUserJson) {
    const connectedUser = JSON.parse(connectedUserJson);
    id = connectedUser.id;
    
   
  const  item ={
      "senderId": id,
      "receiverId": userId
    }
    return this.http.put<any[]>(`https://localhost:7166/api/FriendRequest/ReplyToRequest?response=${response}`,item)
  }
    
 

return of(null);
}

}
