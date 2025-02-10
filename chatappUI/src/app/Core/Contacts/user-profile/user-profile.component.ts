
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from '../../Dashbord/add-post/add-post.component';
import { ProfileService } from 'src/app/Services/ProfileService/profile.service';
import { Subscription } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/AuthService/auth-service.service';
import { ContactService } from 'src/app/Services/Contacts/contact.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent  implements OnInit{
  friendRequestStatus:string="";
block:boolean=true;
mute:boolean=true;
muteText:string="Mute messages"
blockText:string="Block profile"
FriendSubscription : Subscription |undefined;
BlockedUsersSubscription : Subscription |undefined;
UserProfileByIdSubscription : Subscription |undefined;
UserpostByUdSubscription : Subscription |undefined;
currentView:string='about';
profileImage: string | ArrayBuffer |undefined | null = null ; 
coverImage: string | ArrayBuffer |undefined | null = null ; 
selectedFile: File | null = null;
@ViewChild('profileInput') profileInput: ElementRef |undefined ;
@ViewChild('coverInput') coverInput: ElementRef |undefined ;
userId: string ="";
  constructor(private http:HttpClient ,private profileService :ProfileService, private router :Router, private userService :AuthServiceService,private route: ActivatedRoute, private contact :ContactService){}

  UserProfileById =this.profileService.UserprofileById;
UserpostsbyId = this.profileService.UserpostsById;
BlokedUsers = this.contact.BlokedUsers;
Friends=this.contact.Friends;
  ngOnInit(): void {
    const connectedUserJson = localStorage.getItem('ConnectedUser');
    
    var connectedUserid: any;
    if (connectedUserJson) {
      const connectedUser = JSON.parse(connectedUserJson);
      connectedUserid = connectedUser.id;
    }
    this.userId = this.route.snapshot.paramMap.get('id')!;

    this.BlockedUsersSubscription =this.contact.BlokedUsers$.subscribe(p=>{
      this.BlokedUsers = p
      
    });
    this.contact.getBlockedUsers()

    this.FriendSubscription =this.contact.Friends$.subscribe(p=>{
      this.Friends = p
    });
    this.contact.getAllFriends()
     
    //get profile information
    this.UserProfileByIdSubscription =this.profileService.UserprofileById$.subscribe(p=>{
      this.UserProfileById = p

   
     
      const isBlocked = this.BlokedUsers.some((user: { id: string; }) => user.id === this.userId);
      const isFriend = this.Friends.some((user: { id: string; }) => user.id === this.userId);
      console.log('bb',   this.BlokedUsers)
      if (isBlocked) {
        this.friendRequestStatus = "Blocked";
        this.blockText="Unblock profile"
      }else if (isFriend) {
        this.friendRequestStatus = "Friend";
        
      }
      else{
      const receivedRequest = this.UserProfileById?.receivedRequests?.filter(
        (request: any) => String(request.receiverId) === this.userId && String(request.senderId) ===connectedUserid 
      );

      const sentRequest = this.UserProfileById?.sentRequests?.filter(
        (request: any) => String(request.receiverId) ===connectedUserid  && String(request.senderId) === this.userId
      );
      
  console.log('sent',sentRequest)
      if (receivedRequest.length==1) this.friendRequestStatus = "Invitation submitted";
      else if(sentRequest.length==1) this.friendRequestStatus ="Accept invitation"
      else this.friendRequestStatus = "Be My Friend";
       }
    });
    this.profileService.getProfileUserById(this.userId)


    //getAll posts of this profile
    this.UserpostByUdSubscription =this.profileService.UserpostById$.subscribe(p=>{
    
      this.UserpostsbyId =  p.filter(post => {
        const isBlocked = this.BlokedUsers.some((user: { id: string }) => user.id === post.userId);
        const isFriend = this.Friends.some((user: { id: string }) => user.id === post.userId);
        const isCurrentUser = post.userId === this.userId;
    
        
        if (isBlocked) return false;
    
        if (isCurrentUser) return true;
    
        if (isFriend) return post.privacy !== "Me only";
    
        return post.privacy === "Public";
      });
      
    });
    this.profileService.getPostUserById(this.userId)
    
  }
 dialog = inject(MatDialog);




  ConvertDate(date:Date):string{
    date = new Date(date)
    const newDate=`${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
    return newDate;
  }

  SetView(view :string){
    this.currentView =view
    
  }

 
  getProfileImage(base64String: any): string {
    return `data:image/png;base64,${base64String}`; // Ajustez le type MIME si nécessaire
  }
  

  AddFriendRequest(){
    if(this.friendRequestStatus === "Be My Friend"){
      this.contact.AddFriendRequest(this.userId)
      this.friendRequestStatus = "Invitation submitted";
    }
    else if(this.friendRequestStatus === 'Accept invitation'){
      const connectedUserJson = localStorage.getItem('ConnectedUser');
    
    var connectedUserid: any;
    if (connectedUserJson) {
      const connectedUser = JSON.parse(connectedUserJson);
      connectedUserid = connectedUser.id;
    }
      const  item ={
        "senderId": this.userId,
        "receiverId": connectedUserid
      }
      this.http.put<any[]>(`https://localhost:7166/api/FriendRequest/ReplyToRequest?response=${true}`,item).subscribe(data=>{
        this.friendRequestStatus ="Friend"
      })
    }
    else{
      this.contact.DeleteRequest(this.userId).subscribe(data=>{
       
      })
      this.friendRequestStatus = "Be My Friend";
    }
  }


  Block(){
    if(this.friendRequestStatus!="Blocked"){
      this.block=false
      this.mute=false
      this.blockText="Unblock profile"
      this.contact.blockUser(this.userId);
      this.friendRequestStatus = "Blocked"
    }
    else{
      this.block=true
      this.mute=true
      this.blockText="Block profile"
      this.contact.unblock(this.userId)
      this.friendRequestStatus = "Be My Friend";
    }
    
  }

  Mute(){
    if(this.mute) {
      this.mute =false
      this.muteText ="Unmute messages"
    }
    else{
      this.mute = true
      this.muteText ="Mute messages"
    }
  }
  unfriend(){
    this.contact.unfriend(this.userId )
    this.friendRequestStatus = "Be My Friend";
  }

}

