import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupColorsComponent } from '../popup-colors/popup-colors.component';
import { ChatsModule } from '../../Dashbord/chats/chats.module';
import { ChatsService } from 'src/app/Services/chats/chats.service';
import { PopupEmojiComponent } from '../popup-emoji/popup-emoji.component';
import { PopupNamesComponent } from '../popup-names/popup-names.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{
   selectedConversationId: string | null = null;
    Conversationsubscription: Subscription | undefined;
    subscription: Subscription | undefined;
   User:any;
  readonly dialog = inject(MatDialog);
constructor(public chat:ChatsService){}
conversationSelected= this.chat.ConversationBetweenTwoUsers;

  ngOnInit(): void {
    this.subscription = this.chat.currentConversationId.subscribe(id => {
      this.selectedConversationId = id;
      
      if(id !=null){
      this.Conversationsubscription = this.chat.ConversationBetweenTwoUsers$.subscribe(conv=>{
         this.conversationSelected =conv;
         this.User={name: this.conversationSelected.user2.firstName +" "+ this.conversationSelected.user2.lastName,
                    email :this.conversationSelected.user2.email,
                    situation :this.conversationSelected.profileUser2?.situation,
                    study :this.conversationSelected.profileUser2?.study
         }
         console.log('user',this.User)
         
      });
     this.chat.GetConversationBetweenTwoUsers(String(id));}
     
    });
  }
  openPopupColors(selectedConversationId:string) {
    const dialogRef= this.dialog.open(PopupColorsComponent, {
      data: { conversationId: selectedConversationId }
    });
    dialogRef.componentInstance.colorSelected.subscribe((color: string) => {
      this.chat.setColor(color); 
      
    });
  }

  openPopupEmojis(selectedConversationId:string)
  {
    const dialogRef= this.dialog.open(PopupEmojiComponent, {
      data: { conversationId: selectedConversationId }
    });
    dialogRef.componentInstance.emojiSelected.subscribe((emoji: string) => {
      this.chat.setEmoji(emoji); 
      
     // dialogRef.close();
    });
  }

  openPopupNames(){
    const dialogRef= this.dialog.open(PopupNamesComponent);
    dialogRef.componentInstance.nameSelected.subscribe((name: string) => {
      this.chat.setName(name); 
      
     // dialogRef.close();
    });
  }

  toggleSettings() {
    // this.isContactOpen = !this.isContactOpen;
     this.chat.isSettingsOpen = !this.chat.isSettingsOpen;
   }
}
