import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/Services/Contacts/contact.service';
import { ProfileService } from 'src/app/Services/ProfileService/profile.service';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent implements OnInit{
usersSubscription : Subscription | undefined;
sentInvitations : any;
constructor(private profile : ProfileService, private router :Router, private contact:ContactService){}
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

  Decline(id:string){
    this.contact.DeleteRequest(id).subscribe(
      () => {
        console.log(`Request ${id} declined.`);
        this.usersSubscription = this.profile.profileById$.subscribe(user=>{
          this.user =user;
          console.log('usse',user)
           // const rec = u.receivedRequests
           
        });
        this.profile.getProfileById()
      },
      error => {
        console.error("Error declining request:", error);
      }
    );
  }
}
