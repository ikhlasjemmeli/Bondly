import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatsService } from 'src/app/Services/chats/chats.service';
import { ContactService } from 'src/app/Services/Contacts/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
    ConversationsSubscription :Subscription | undefined;
  constructor( public chat:ChatsService){

  }
  Conversations=this.chat.Conversations
  ngOnInit(): void {
    this.ConversationsSubscription = this.chat.Conversations$.subscribe(Conversation=>{
      this.Conversations =Conversation;
    });
    this.chat.GetAllConversations()
   
  }

  selectConversation(id: string) {
    this.chat.selectConversation(id);
  }

 formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const diffSeconds = Math.floor(diffMs / 1000); // Correction ici : division par 1000
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "À l'instant"; // Correction ici pour les secondes
  if (diffMinutes < 60) return `${diffMinutes} min`;
  if (diffHours < 24) return `${diffHours} h`;
  if (diffDays < 7) return `${diffDays} jour${diffDays > 1 ? 's' : ''}`;

  return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
  });

  
}



toggleContacts() {
  if (window.innerWidth < 990) {
  this.chat.isContactOpen = !this.chat.isContactOpen;
}}


MarkAsView(ConversationId : string,userId :string){
  this.chat.MarkAsViewed(ConversationId,userId);
  
}

}
