import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password-dialog',
  templateUrl: './forget-password-dialog.component.html',
  styleUrls: ['./forget-password-dialog.component.scss']
})
export class ForgetPasswordDialogComponent {
  forgetForm!: FormGroup;
constructor(private formbuilder:FormBuilder ){
  this.forgetForm= this.formbuilder.group({
    email:['', [Validators.required, Validators.email]]
  })
}
}
