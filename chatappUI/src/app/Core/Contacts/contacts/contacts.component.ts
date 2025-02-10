import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/Services/Contacts/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit{
 UsersSubscription :Subscription | undefined;
  constructor(private contact:ContactService, private router : Router){

  }
  Users=this.contact.Users;


  ngOnInit(): void {
    this.UsersSubscription = this.contact.Users$.subscribe(users=>{
      this.Users =users;
      console.log(this.Users)
      
    })
    this.contact.getAllUsers()

    
  }

  ViewProfile(user:any){
     this.router.navigate([`/home/UserProfile/${user.id}`])
  }
 

  AddFriendRequest(userId:string){
  
      this.contact.AddFriendRequest(userId)
     
  }
 
}
