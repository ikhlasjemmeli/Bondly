import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatsService } from 'src/app/Services/chats/chats.service';
import { ContactService } from 'src/app/Services/Contacts/contact.service';
//import 'emoji-mart/css/emoji-mart.css';  // Styles CSS nécessaires
//import { Picker } from 'emoji-mart';
@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit{
  FriendsSubscription :Subscription | undefined;
  selectedConversationId: string | null = null;
  Conversationsubscription: Subscription | undefined;
  subscription: Subscription | undefined;
  selectedColor: any;
  selectedEmoji: any ;
  ss:string='thumb_up'
  selectedName: any = '';
  messages: message[] =[];
  Name:string="";

  emojis = [
    { name: 'sentiment_very_satisfied', symbol: '😀' },
    { name: 'sentiment_satisfied', symbol: '😊' },
    { name: 'sentiment_neutral', symbol: '😐' },
    { name: 'sentiment_dissatisfied', symbol: '☹️' },
    { name: 'sentiment_very_dissatisfied', symbol: '😢' },
    { name: 'mood', symbol: '😂' },
    { name: 'mood_bad', symbol: '😭' },
    { name: 'thumb_up', symbol: '👍' },
    { name: 'thumb_down', symbol: '👎' },
    { name: 'favorite', symbol: '❤️' },
    { name: 'star', symbol: '⭐' },
    {name:'thumb_up',symbol:'👍'}
  ];

  showEmojiPicker = false;
  messageInput: string = '';
  constructor(public chat:ChatsService){
    this.selectedEmoji='👍';
  }
conversationSelected= this.chat.ConversationBetweenTwoUsers;
  ngOnInit(): void {
    const connectedUserJson = localStorage.getItem('ConnectedUser');
    let connectedUserid: any;
    if (connectedUserJson) {
      const connectedUser = JSON.parse(connectedUserJson);
      connectedUserid = connectedUser.id;
    }

    this.selectedEmoji='👍';
   
    this.chat.currentColor.subscribe((color: string) => {
      this.selectedColor = color;
    
    });

    this.chat.currentEmoji.subscribe((emoji: string) => {
      this.selectedEmoji = this.getSymbolFromName(emoji);
    
    });

    this.chat.currentName.subscribe((name: string) => {
      this.selectedName = name;
   
    });

    this.subscription = this.chat.currentConversationId.subscribe(id => {
      this.selectedConversationId = id;
      
      if(id !=null){
      this.Conversationsubscription = this.chat.ConversationBetweenTwoUsers$.subscribe(conv=>{
         this.conversationSelected =conv;
        
         this.selectedColor = this.conversationSelected.color
         this.selectedEmoji= this.conversationSelected.Emoji
         this.Name= this.conversationSelected.user2.firstName + this.conversationSelected.user2.lastName
         this.messages = this.conversationSelected.messages.map((msg:any) => ({
          text: msg.content,
          sender: msg.senderId === connectedUserid ? 'me' : 'friend',
          isEmoji:msg.isEmoji,
          date:msg.timestamp,
          view:msg.view
        }));
        //console.log('conv',this.conversationSelected)
    
      });
     this.chat.GetConversationBetweenTwoUsers(this.conversationSelected.user2.id);}
     
    });
    
  }

  getSymbolFromName(name: string): string {
    const emoji = this.emojis.find(e => e.name === name);
    return emoji ? emoji.symbol : '';
  }
  // Liste des catégories disponibles
  availableCategories = ['people'];

  // Catégorie sélectionnée
  selectedCategory: string = 'Smileys';

  // Variable pour inclure uniquement la catégorie sélectionnée
  includedCategories: string[] = [this.selectedCategory];

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
   
    const emoji = event.emoji.native;  // Récupérer l'emoji sélectionné
    this.messageInput = this.messageInput ? this.messageInput + emoji : emoji;
  }


  AddNewMessage(message: string,receiverId:string , isEmoji:boolean){
    if(message=='') return;
    const now = new Date();
    let msg: message = { text: message, sender: "me",isEmoji: isEmoji, date:now, view:false};
    this.messages.push(msg);
    this.messageInput='' ;
    this.chat.SendMessage(receiverId,message,isEmoji);
  }



  formatTimeAgo(dateString: Date): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
  
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
  
    if (diffMinutes < 60) return diffMinutes < 1 ? "À l'instant" : `${diffMinutes} min`;
  
    const isSameDay = date.toDateString() === now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
  
    const formattedTime = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  
    if (isSameDay) return formattedTime;
    if (isYesterday) return `Yesterday ${formattedTime}`;
  
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) + ` ${formattedTime}`;
  }
  
  isSameDay(date1: Date, date2: Date): boolean {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  }
  
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  }
  

 
 // isContactOpen= this.chat.isContactOpen
toggleContacts() {
 // this.isContactOpen = !this.isContactOpen;
  this.chat.isContactOpen = !this.chat.isContactOpen;
}

toggleSettings() {
  // this.isContactOpen = !this.isContactOpen;
   this.chat.isSettingsOpen = !this.chat.isSettingsOpen;
 }

}


interface message{
  text:string,
  sender:string,
  isEmoji:boolean,
  date:Date,
  view :boolean
}


