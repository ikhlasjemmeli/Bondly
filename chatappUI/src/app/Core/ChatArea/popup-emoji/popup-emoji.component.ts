import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatsService } from 'src/app/Services/chats/chats.service';

@Component({
  selector: 'app-popup-emoji',
  templateUrl: './popup-emoji.component.html',
  styleUrls: ['./popup-emoji.component.scss']
})
export class PopupEmojiComponent {
@Output() emojiSelected = new EventEmitter<string>();
  selectedEmoji: string = '';
  constructor(private chat:ChatsService,@Inject(MAT_DIALOG_DATA) public data: any ){}
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
  
  

  selectEmoji(emoji: string) {
    this.selectedEmoji = emoji;
    this.emojiSelected.emit(this.selectedEmoji);  
  }

  ChangeEmoji() :void{
    console.log(this.data.conversationId, this.selectedEmoji)
        this.chat.ChangeEmoji(this.data.conversationId, this.selectedEmoji);
      }
}
