import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/Services/Contacts/contact.service';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  styleUrls: ['./blocked.component.scss']
})
export class BlockedComponent  implements OnInit{
BlockedSubscrption :Subscription |undefined;
constructor(private contact:ContactService){

}
Blocked=this.contact.BlokedUsers;
  ngOnInit(): void {
    this.BlockedSubscrption = this.contact.BlokedUsers$.subscribe(block=>{
      this.Blocked = block
      console.log(this.Blocked)
    });
    this.contact.getBlockedUsers()
  }
}
