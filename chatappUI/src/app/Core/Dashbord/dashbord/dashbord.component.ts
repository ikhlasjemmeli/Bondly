import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent {
  dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(AddPostComponent, {
      
    });
  }

}
