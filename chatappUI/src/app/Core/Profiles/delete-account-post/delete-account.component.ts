import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/AuthService/auth-service.service';
import { ProfileService } from 'src/app/Services/ProfileService/profile.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit{
title:string=''
constructor(private userService :AuthServiceService,private profile:ProfileService, private router :Router,@Inject(MAT_DIALOG_DATA) public type: any){

}

ngOnInit(): void {
  if(this.type =="account"){
      this.title ="Account"
  }
  if(this.type.type =="post"){
    this.title="post"
  }
}

  Delete(){
    if(this.type =="account"){
    this.userService.DeleteAccount().subscribe(data=>{
      this.router.navigate(['/SignUp'])
    },
  error=>{
    console.log(error);
  });
}
 if(this.type.type=="post"){
  
  this.profile.DeletePost(this.type.post.id)
 }
    
  }
}
