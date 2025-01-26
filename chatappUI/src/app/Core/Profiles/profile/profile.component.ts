import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from '../../Dashbord/add-post/add-post.component';
import { ProfileService } from 'src/app/Services/ProfileService/profile.service';
import { Subscription } from 'rxjs';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/AuthService/auth-service.service';
import { DeleteAccountComponent } from '../delete-account-post/delete-account.component';
import { EditpasswordComponent } from '../editpassword/editpassword.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  implements OnInit{
ProfileByIdSubscription : Subscription |undefined;
postByUdSubscription : Subscription |undefined;
currentView:string='posts';
profileImage: string | ArrayBuffer |undefined | null = null ; 
coverImage: string | ArrayBuffer |undefined | null = null ; 
selectedFile: File | null = null;
@ViewChild('profileInput') profileInput: ElementRef |undefined ;
@ViewChild('coverInput') coverInput: ElementRef |undefined ;

  constructor(private profileService :ProfileService, private router :Router, private userService :AuthServiceService){}

  ProfileById =this.profileService.profileById;
postsbyId = this.profileService.postsById;

  ngOnInit(): void {
    //get profile information
    this.ProfileByIdSubscription =this.profileService.profileById$.subscribe(p=>{
      this.ProfileById = p
    });
    this.profileService.getProfileById()


    //getAll posts of this profile
    this.postByUdSubscription =this.profileService.postById$.subscribe(p=>{
      this.postsbyId = p
      console.log('posts',this.postsbyId)
    });
    this.profileService.getPostById()
    
  }
 dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(AddPostComponent, {
      
    });
  }

  openDialogEdit(profil:any) {
    
    this.dialog.open(EditprofileComponent, {
     data:profil
     
    });
  }


  OpenDialogDeleteAccount(type:string){
    
    this.dialog.open(DeleteAccountComponent, {
      data:type
    });
  }
  OpenDialogEditPassword(){
    this.dialog.open(EditpasswordComponent, {
      
    });
  }
  ConvertDate(date:Date):string{
    date = new Date(date)
    const newDate=`${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
    return newDate;
  }

  SetView(view :string){
    this.currentView =view
    console.log(this.currentView)
  }

 
  getProfileImage(base64String: any): string {
    return `data:image/png;base64,${base64String}`; // Ajustez le type MIME si nécessaire
  }
  
  triggerFileInput(picture :string) {
    if( this.profileInput !=undefined && picture==='profile'){
      this.profileInput.nativeElement.click();
     
    }
    if( this.coverInput !=undefined && picture==='cover'){
      this.coverInput.nativeElement.click();
     
    }
  
  }

  onFileSelected(event: any, picture:string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if(picture==='profile')
          {
           this.profileImage = e.target.result.split(',')[1]; 
          console.log(this.profileImage)
        }
        else{
          this.coverImage = e.target.result.split(',')[1]; 
        }
         
      };
      reader.readAsDataURL(file);
     
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/Login'])
  }


}
