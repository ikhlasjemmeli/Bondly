import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/Services/AuthService/auth-service.service';
import { ProfileService } from 'src/app/Services/ProfileService/profile.service';

@Component({
  selector: 'app-editpassword',
  templateUrl: './editpassword.component.html',
  styleUrls: ['./editpassword.component.scss']
})
export class EditpasswordComponent {
  editPassword!:FormGroup
  constructor(private user:AuthServiceService, private formbuilder:FormBuilder, private toastr:ToastrService){

this.editPassword= this.formbuilder.group({
  password:['',Validators.required],
  newPassword:['',Validators.required],
  confirmPassword:['',Validators.required]
})
  }

  ConfirmPassword(): boolean{
    const password = this.editPassword.get('newPassword')?.value;
    const confirmPassword = this.editPassword.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  Edit() {
    this.user.editPassword(this.editPassword.value).subscribe(
      (data) => {
        // Afficher le message de succès
        this.toastr.success(data.message || 'Password updated!', 'Success');
      },
      (error) => {
        console.error('Erreur capturée :', error);
  
        let errorMessage = 'Unexpected error';
  
        // Vérifiez si error.error est une chaîne JSON
        if (typeof error.error === 'string') {
          try {
            const parsedError = JSON.parse(error.error); // Parsez la chaîne en JSON
            errorMessage = parsedError.message || errorMessage;
          } catch (e) {
            console.error('Erreur lors du parsing JSON :', e);
          }
        } else if (error.error?.message) {
          errorMessage = error.error.message; // Si déjà un objet JSON
        }
  
        // Afficher le message d'erreur dans Toastr
        this.toastr.error(errorMessage, 'Error');
      }
    );
  }
  
  
}
