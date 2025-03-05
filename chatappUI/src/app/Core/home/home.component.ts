import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatsService } from 'src/app/Services/chats/chats.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
   ConversationsSubscription :Subscription | undefined;
    
   msg:number=0;
  isDarkMode = false;
  constructor(private chat :ChatsService){}
  Conversations=this.chat.Conversations
  ngOnInit(): void {
    this.ConversationsSubscription = this.chat.Conversations$.subscribe(Conversation=>{
      this.Conversations =Conversation;
      this.msg = this.Conversations.reduce((total:any, conv:any) => total + (conv.messageNotViewed || 0), 0);

      console.log(this.msg)
  
    });
    this.chat.GetAllConversations()
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  navigateToChat()
    {
      if (window.innerWidth < 990) {
      this.chat.isContactOpen = true;
    }}
}
