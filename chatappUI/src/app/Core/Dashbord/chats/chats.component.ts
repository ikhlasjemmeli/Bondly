import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/Services/Contacts/contact.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit{
FriendSubscription :Subscription | undefined;
constructor(private contact :ContactService, private router :Router){

}
Friends = this.contact.Friends
  ngOnInit(): void {
    this.FriendSubscription = this.contact.Friends$.subscribe(Friends=>{
      this.Friends = Friends
      console.log('Friends',this.Friends)
    });
    this.contact.getAllFriends();
  }


  navigateToProfile(userId:string){
     this.router.navigate([`/home/UserProfile/${userId}`]);
  }
}
