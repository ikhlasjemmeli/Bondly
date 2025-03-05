import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from '../Core/Dashbord/statistics/statistics.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ChatsComponent } from '../Core/Dashbord/chats/chats.component';
import { PostsComponent } from '../Core/Dashbord/posts/posts.component';
import { AboutComponent } from '../Core/Profiles/about/about.component';
import { ContactComponent } from '../Core/ChatArea/contact/contact.component';
import { SettingsComponent } from '../Core/ChatArea/settings/settings.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    StatisticsComponent,
    ChatsComponent,
    PostsComponent,
    AboutComponent,
    ContactComponent,
    SettingsComponent
    
  ],
  imports: [
    CommonModule,
    MatListModule, 
    MatDividerModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    StatisticsComponent,
    ChatsComponent,
    PostsComponent,
    AboutComponent,
    ContactComponent,
    SettingsComponent
  ]
})
export class SharedmoduleModule { }
