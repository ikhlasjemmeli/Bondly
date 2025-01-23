import {Component} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { first } from 'rxjs';
import { AuthServiceService } from 'src/app/Services/AuthService/auth-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  
})

export class SignupComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  SignUpForm!: FormGroup;
  constructor(private formbuilder:FormBuilder, private authService : AuthServiceService, private toastr: ToastrService){
    this.SignUpForm = this.formbuilder.group({
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        dateOfBirth:['',Validators.required],
        email:['',[Validators.required, Validators.email]],
        password:['',Validators.required],
        confirmPassword:['',Validators.required],
        acceptCondition:['',Validators.required]
    });

    }


    ConfirmPassword(): boolean{
      const password = this.SignUpForm.get('password')?.value;
      const confirmPassword = this.SignUpForm.get('confirmPassword')?.value;
      return password === confirmPassword;
    }

    showSuccess() {
      this.toastr.success('Hello world!', 'Toastr fun!');
    }
    showError() {
      this.toastr.error('Hello world!', 'Toastr fun!');
    }

    SignUp()
    {
      if(this.SignUpForm.value !=null){
        this.authService.SignUp(this.SignUpForm.value);
    
      }
      else{
         console.log('error');
      }
      
        
    }
  
}
