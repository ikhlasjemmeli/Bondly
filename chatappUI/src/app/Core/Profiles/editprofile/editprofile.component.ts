import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/Services/ProfileService/profile.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit{
  CompleteProfile!:FormGroup;
  
  relationshipStatuses = [
    { value: 'single', viewValue: 'Single and Loving It' },
    { value: 'relationship', viewValue: 'In a Relationship' },
    { value: 'engaged', viewValue: 'Engaged to Happiness' },
    { value: 'married', viewValue: 'Married and Thriving' },
    { value: 'complicated', viewValue: 'It’s Complicated' },
    { value: 'taken', viewValue: 'Happily Taken' },
    { value: 'open', viewValue: 'Open to New Adventures' },
    { value: 'exploring', viewValue: 'Exploring New Horizons' },
    { value: 'focused', viewValue: 'Focused on Myself' },
    { value: 'loveLife', viewValue: 'In Love with Life' },
];

constructor(private formbuilder:FormBuilder, private profile:ProfileService, private router:Router, @Inject(MAT_DIALOG_DATA) public profil: any){
  {
    this.CompleteProfile = this.formbuilder.group({
      bio: ['', Validators.required],
      workPlace: ['', Validators.required],
      study: ['', Validators.required],
      situation: ['', Validators.required]
    });
}}

ngOnInit(): void {
  if (this.profil) {
    this.CompleteProfile.patchValue({
      bio: this.profil.bio || '', // Valeur par défaut si la clé est manquante
      workPlace: this.profil.workPlace || '',
      study: this.profil.study || '',
      situation: this.profil.situation || ''
    });
  } else {
    console.warn('Profil est null ou non défini');
  }
}


EditProfile() {
  
  if (this.CompleteProfile.value != null) {

    this.profile.CompleteProfile(this.CompleteProfile.value).subscribe(
      (data: any) => {
       
       this.router.navigate(["/home/profile"])
       
      },
      (error: any) => {
        console.log(error);
      }
    );
  } else {
    console.log('error');
  }
}


}
