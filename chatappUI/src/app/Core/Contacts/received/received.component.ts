import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/Services/Contacts/contact.service';
import { ProfileService } from 'src/app/Services/ProfileService/profile.service';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss']
})
export class ReceivedComponent implements OnInit{
usersSubscription : Subscription | undefined;
sentInvitations : any;
constructor(private profile : ProfileService, private router:Router, private contact :ContactService){}
user = this.profile.UserprofileById;

  ngOnInit(): void {
    this.usersSubscription = this.profile.profileById$.subscribe(user=>{
      this.user =user;
      console.log('usse',user)
       // const rec = u.receivedRequests
       
    });
    this.profile.getProfileById()
  }

  ViewProfile(id:any){
    this.router.navigate([`/home/UserProfile/${id}`])
  }

  Reply(response:boolean, id:string){
    this.contact.ReplyToRequest(response,id).subscribe(data=>{
      console.log('reply', response,id);
    },
  error=>{
    console.log(error.error)
  })
  }
}
