import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/Services/ProfileService/profile.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit{
AddPostForm!:FormGroup;
ProfileByIdSubscription : Subscription |undefined;
today = new Date();
privacy = [
  { value: 'Public' },
  { value: 'Friends'},
  { value: 'Me only'}
 
];
Image: string | ArrayBuffer |undefined | null = null ; 
selectedFile: File | null = null;
@ViewChild('Input') Input: ElementRef |undefined ;


constructor(private formbuilder :FormBuilder, private profileService:ProfileService , private router :Router){
  this.AddPostForm =this.formbuilder.group({
    description:[''],
    postPath:[''],
    privacy:['',Validators.required]
  }  ,{ validators: this.atLeastOneFieldValidator })
}

ProfileById =this.profileService.profileById;

ngOnInit(): void {
  this.ProfileByIdSubscription =this.profileService.profileById$.subscribe(p=>{
    this.ProfileById = p
  });
  this.profileService.getProfileById()
  this.profileService.getPostById()
}

atLeastOneFieldValidator(control: AbstractControl): ValidationErrors | null {
  const description = control.get('description')?.value;
  const postPath = control.get('postPath')?.value;

  if (!description && !postPath) {
    return { atLeastOneFieldRequired: true }; 
  }
  return null; 
}

ConvertDate(date: Date): string {
  date = new Date(date);

  const day = (date.getDate() < 10 ? '0' : '') + date.getDate(); // Ajouter un 0 si nécessaire
  const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1); // Ajouter un 0 si nécessaire
  const year = date.getFullYear();

  const newDate = `${day}/${month}/${year}`;
  return newDate;
}
AddPost(){
  if(this.AddPostForm.value !=null){
    this.profileService.Addpost(this.AddPostForm.value).subscribe(data=>{
        console.log("post aded ")
      
       this.profileService.getPostById()
    },
  error=>{
      console.log(error)
  });
  
    
  }
}

getProfileImage(base64String: any): string {
  return `data:image/png;base64,${base64String}`; // Ajustez le type MIME si nécessaire
}

triggerFileInput() {
  if( this.Input !=undefined ){
    this.Input.nativeElement.click();
   console.log("sfsdf")
  }
}

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
    
         this.Image = e.target.result.split(',')[1]; 
    };
    reader.readAsDataURL(file);
   
  }
}

}
