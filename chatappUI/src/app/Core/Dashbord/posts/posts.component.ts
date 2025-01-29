import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCommentComponent } from '../dialog-comment/dialog-comment.component';
import { ProfileService } from 'src/app/Services/ProfileService/profile.service';
import { DeleteAccountComponent } from '../../Profiles/delete-account-post/delete-account.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  dialog = inject(MatDialog);
  @Input() postsbyId: any[] = [];
  
  constructor(private profile:ProfileService){}
  openDialog(post:any) {
    this.dialog.open(DialogCommentComponent, {
    data:post
    });
  }


  openDialogDelete(post:any,type:string){
    this.dialog.open(DeleteAccountComponent, {
      data: { post, type }
      
  });}

  AddReact(type:string,postId:string){
    this.profile.AddReact(type,postId)
  }

  getReactionCount(reactions:any[],id :number):number{
    return reactions.filter(reaction => reaction.reactionTypeId === id).reduce((sum, react) => sum + react.number, 0);

  }
 /* deletePost(post :any){
 
     this.profile.DeletePost(post.id) /*.subscribe(data=>{
      console.log("post deleted");
     },
    error=>{
    console.log("error");
    })
  }*/
}
