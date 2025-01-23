import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './Account/signup/signup.component';
import { SignupModule } from './Account/signup/signup.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LoginComponent } from './Account/login/login.component';
import { LoginModule } from './Account/login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DashbordComponent } from './Core/Dashbord/dashbord/dashbord.component';
import { DashbordModule } from './Core/Dashbord/dashbord/dashbord.module';
import { ForgetPasswordDialogComponent } from './Account/forget-password-dialog/forget-password-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StatisticsComponent } from './Core/Dashbord/statistics/statistics.component';
import { StatisticsModule } from './Core/Dashbord/statistics/statistics.module';
import { ChatsComponent } from './Core/Dashbord/chats/chats.component';
import { PostsComponent } from './Core/Dashbord/posts/posts.component';
import { MatButtonModule } from '@angular/material/button';
import { AddPostComponent } from './Core/Dashbord/add-post/add-post.component';
import { DialogCommentComponent } from './Core/Dashbord/dialog-comment/dialog-comment.component';


@NgModule({
  declarations: [
    AppComponent,
    ForgetPasswordDialogComponent,
    AddPostComponent,
    DialogCommentComponent,
   // PostsComponent,
   // ChatsComponent,
  //StatisticsComponent
   
   
   
    
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignupModule,
    LoginModule,
    DashbordModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule, 
     MatButtonModule, 
    //StatisticsModule,
    ToastrModule.forRoot({ // Configuration globale
      timeOut: 3000, // Durée par défaut des toasts (ms)
      positionClass: 'toast-top-right', // Position des toasts
      preventDuplicates: true, // Évite les doublons
    }),
   
  ],
  providers: [
    provideAnimations(), // required animations providers
   // provideToastr(), // Toastr providers
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
