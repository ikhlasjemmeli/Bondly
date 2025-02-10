import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/Services/AuthService/auth-service.service';
import { ForgetPasswordDialogComponent } from '../forget-password-dialog/forget-password-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!:FormGroup;
  readonly dialog = inject(MatDialog);
constructor(private formbuilder : FormBuilder, private authservice :AuthServiceService, private toastr:ToastrService, private router:Router){
this.loginForm= this.formbuilder.group({
  email:['',[Validators.required, Validators.email]],
  password:['',Validators.required]
})
}

Login(): void {
  if (!this.loginForm.valid) {
    this.toastr.error('Please fill in the form correctly. ', 'Erreur');
    return;
  }

  this.authservice.Login(this.loginForm.value).subscribe({
    next: (data) => {
      if (data.token && data.connectedUser) {
        localStorage.clear();
        localStorage.setItem('Token', data.token);
        localStorage.setItem('ConnectedUser', JSON.stringify(data.connectedUser));
        this.toastr.success('Successful connection!', 'Succès');
        this.router.navigate(['/home/dashboard']);
      }
    },
    error: (error) => {
      this.toastr.error(error?.error?.message || 'An error has occurred.', 'Erreur');
    }
  });
}




openDialog() {
  this.dialog.open(ForgetPasswordDialogComponent).afterClosed().subscribe();
}

}
