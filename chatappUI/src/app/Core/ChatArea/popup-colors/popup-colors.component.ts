import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatsService } from 'src/app/Services/chats/chats.service';

@Component({
  selector: 'app-popup-colors',
  templateUrl: './popup-colors.component.html',
  styleUrls: ['./popup-colors.component.scss']
})
export class PopupColorsComponent {
  @Output() colorSelected = new EventEmitter<string>();
  selectedColor: string = '';
  
  colors = [
    'Red', // Red
    'Green', // Green
    'Blue', // Blue
    'Yellow', // Yellow
    'Orange', // Orange
    'Purple', // Purple
    'Pink', // Pink
    'Brown', // Brown
    'Gray', // Gray
    
  ];
constructor(private chat:ChatsService,@Inject(MAT_DIALOG_DATA) public data: any ){

}
  selectColor(color: string) {
    this.selectedColor = color;
    this.colorSelected.emit(this.selectedColor);
  }

  ChangeColor() :void{
console.log(this.data.conversationId, this.selectedColor)
    this.chat.ChangeColor(this.data.conversationId, this.selectedColor);
  }

 
}
