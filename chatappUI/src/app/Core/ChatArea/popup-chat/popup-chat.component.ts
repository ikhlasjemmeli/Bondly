import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ChatsService } from 'src/app/Services/chats/chats.service';

@Component({
  selector: 'app-popup-chat',
  templateUrl: './popup-chat.component.html',
  styleUrls: ['./popup-chat.component.scss']
})
export class PopupChatComponent  implements OnInit{
  Conversationsubscription : Subscription | undefined;
  isCollapsed: boolean = false; // false = affichage complet

  showEmojiPicker = false;
  messageInput: string = '';
  messages: message[] = [];
  availableCategories = ['people'];

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
  constructor(private chat:ChatsService,@Inject(MAT_BOTTOM_SHEET_DATA) public data: any){
    console.log(data)
  }
Conversation =this.chat.ConversationBetweenTwoUsers;

  ngOnInit(): void {
    const connectedUserJson = localStorage.getItem('ConnectedUser');
    let connectedUserid: any;
    if (connectedUserJson) {
      const connectedUser = JSON.parse(connectedUserJson);
      connectedUserid = connectedUser.id;
    }
      this.Conversationsubscription = this.chat.ConversationBetweenTwoUsers$.subscribe(conv=>{
         this.Conversation =conv;
        
         this.messages = this.Conversation.messages.map((msg:any) => ({
          text: msg.content,
          sender: msg.senderId === connectedUserid ? 'me' : 'friend',
          isEmoji:msg.isEmoji,
          date:msg.timestamp,
          view:msg.view
        }));
    
      });
     this.chat.GetConversationBetweenTwoUsers(this.data);
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

  getSymbolFromName(name: string): string {
    const emoji = this.emojis.find(e => e.name === name);
    return emoji ? emoji.symbol : '';
  }
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  private _bottomSheetRef =
  inject<MatBottomSheetRef<PopupChatComponent>>(MatBottomSheetRef);
  close($event:MouseEvent):void{
    this._bottomSheetRef.dismiss();
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
    console.log('Emoji sélectionné : ', event);  // Pour inspecter l'événement complet
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
}

interface message{
  text:string,
  sender:string,
  isEmoji :boolean,
  date:Date,
  view :boolean
}
