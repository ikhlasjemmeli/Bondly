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

constructor(private formbuilder : FormBuilder, private authservice :AuthServiceService, private toastr:ToastrService, private router:Router){
this.loginForm= this.formbuilder.group({
  email:['',[Validators.required, Validators.email]],
  password:['',Validators.required]
})
}

Login(){
   if(this.loginForm.value !=null){
    this.authservice.Login(this.loginForm.value).subscribe(
      data=>{
        if(data.token && data.connectedUser){
           localStorage.clear()
          localStorage.setItem('Token',data.token)
          localStorage.setItem('ConnectedUser',JSON.stringify(data.connectedUser))
          this.toastr.success('Login successful!', 'Success')
          this.router.navigate(['/dashboard']);
        }
        
        
      },
      error=>{
        this.toastr.error(error.error.message,'Error');
      }
    )
    
   }
   else{
    console.log('error');
   }
}

readonly dialog = inject(MatDialog);

openDialog() {
  const dialogRef = this.dialog.open(ForgetPasswordDialogComponent);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

}
