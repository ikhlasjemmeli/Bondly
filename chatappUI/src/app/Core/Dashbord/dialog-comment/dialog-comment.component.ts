import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/Services/ProfileService/profile.service';

@Component({
  selector: 'app-dialog-comment',
  templateUrl: './dialog-comment.component.html',
  styleUrls: ['./dialog-comment.component.scss']
})
export class DialogCommentComponent implements OnInit {
  AddCommentForm!: FormGroup;
  totalReactions: number = 0;
  comments: any[] = []; // Tableau local pour stocker les commentaires
  CommentByIdSubscription: Subscription | undefined;
  pageReaction:boolean=true;
  ReactionsFiltred:any;

  constructor(
    private formBuilder: FormBuilder,
    private profile: ProfileService,
    @Inject(MAT_DIALOG_DATA) public post: any
  ) {
    // Initialisation du formulaire
    this.AddCommentForm = this.formBuilder.group({
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ReactionsFiltred =this.post.react;
    // Calcul des réactions totales
    this.totalReactions = this.post.react.reduce(
      (sum: number, react: { number: number }) => sum + react.number,
      0
    );
console.log('reacts :',this.post.react )
    // Souscription pour obtenir les commentaires
    this.CommentByIdSubscription = this.profile.commentById$.subscribe((p) => {
      this.comments = p; // Mise à jour locale des commentaires
    });

    // Appel API pour récupérer les commentaires
    this.profile.getCommentsById(this.post.id);
  }

  AddComment(): void {
    if (this.AddCommentForm.valid) {
      this.profile.AddComment(this.post.id, this.AddCommentForm.value)
      this.AddCommentForm.reset();
    }
  }

  ngOnDestroy(): void {
    // Désinscription pour éviter les fuites de mémoire
    this.CommentByIdSubscription?.unsubscribe();
  }

  getReactionCount(reactions:any[],id :number):number{
    return reactions.filter(reaction => reaction.reactionTypeId === id).reduce((sum, react) => sum + react.number, 0);

  }
  getReactionUsers(reactions:any[],id :number):any{
    this.ReactionsFiltred= reactions.filter(reaction => reaction.reactionTypeId === id);

  }
  getReactions(){
    if(this.pageReaction ==true)
       this.pageReaction =false;
    else
       this.pageReaction =true
  }
}
