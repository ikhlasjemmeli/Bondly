import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/Services/ProfileService/profile.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit{
  ProfileByIdSubscription : Subscription |undefined;
 
constructor(private profileService:ProfileService){

}
profileById= this.profileService.profileById
  ngOnInit(): void {
    this.ProfileByIdSubscription = this.profileService.profileById$.subscribe( p=>{
     this.profileById=p
    
    });
    this.profileService.getProfileById()
  }

  ConvertDate(date:Date):string{
    date = new Date(date)
    const newDate=`${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
    return newDate;
  }



}
