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
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
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
import { HomeComponent } from './Core/home/home.component';
import { HomeModule } from './Core/home/home.module';
import { ProfileComponent } from './Core/Profiles/profile/profile.component';
import { ProfileModule } from './Core/Profiles/profile/profile.module';
import { AboutComponent } from './Core/Profiles/about/about.component';
import { AboutModule } from './Core/Profiles/about/about.module';
import { EditprofileComponent } from './Core/Profiles/editprofile/editprofile.component';
import { MatSelectModule } from '@angular/material/select';
import { DeleteAccountComponent } from './Core/Profiles/delete-account-post/delete-account.component';
import { EditpasswordComponent } from './Core/Profiles/editpassword/editpassword.component';
import { ContactsComponent } from './Core/Contacts/contacts/contacts.component';
import { ContactsModule } from './Core/Contacts/contacts/contacts.module';
import { UserProfileComponent } from './Core/Contacts/user-profile/user-profile.component';
import { UserProfileModule } from './Core/Contacts/user-profile/user-profile.module';
import { SentComponent } from './Core/Contacts/sent/sent.component';
import { ReceivedComponent } from './Core/Contacts/received/received.component';
import { SentModule } from './Core/Contacts/sent/sent.module';
import { ReceivedModule } from './Core/Contacts/received/received.module';
import { BlockedComponent } from './Core/Contacts/blocked/blocked.component';
import { BlockedModule } from './Core/Contacts/blocked/blocked.module';


@NgModule({
  declarations: [
    AppComponent,
    ForgetPasswordDialogComponent,
    AddPostComponent,
    DialogCommentComponent,
    EditprofileComponent,
    DeleteAccountComponent,
    EditpasswordComponent,
    //BlockedComponent,
   
   // UserProfileComponent,
  //  ContactsComponent,
  
    //ProfileComponent,
    //HomeComponent,
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
     HomeModule, 
     ProfileModule,
     AboutModule,
     MatSelectModule,
     MatOptionModule,
     ContactsModule,
     UserProfileModule,
     SentModule,
     ReceivedModule,
     BlockedModule,
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
