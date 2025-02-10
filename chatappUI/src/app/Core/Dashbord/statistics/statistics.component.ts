import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/Services/ProfileService/profile.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit{
  ProfileByIdSubscription : Subscription |undefined;
 
constructor(private profileService:ProfileService, private router :Router){

}
profileById= this.profileService.profileById
  ngOnInit(): void {
    this.ProfileByIdSubscription = this.profileService.profileById$.subscribe( p=>{
     this.profileById=p

     console.log('stat',this.profileById)
    
    });
    this.profileService.getProfileById()
  }

  ConvertDate(date:Date):string{
    date = new Date(date)
    const newDate=`${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
    return newDate;
  }

  navigateToReceived(){
    this.router.navigate(['/home/Received invitations']);
  }
  navigateToSent(){
    this.router.navigate(['/home/Sent invitations']);
  }

  navigateToBlocked(){
    this.router.navigate(['/home/Blocked users']);
  }


}
