import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup-names',
  templateUrl: './popup-names.component.html',
  styleUrls: ['./popup-names.component.scss']
})
export class PopupNamesComponent {
   @Output() nameSelected = new EventEmitter<string>();
    selectedName: string = '';

   

    EditNickName(){
     // this.selectedName = name;
     console.log(this.selectedName)
      this.nameSelected.emit(this.selectedName);
    }
}
