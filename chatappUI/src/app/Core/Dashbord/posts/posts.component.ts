import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCommentComponent } from '../dialog-comment/dialog-comment.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(DialogCommentComponent, {
    
    });
  }
}
