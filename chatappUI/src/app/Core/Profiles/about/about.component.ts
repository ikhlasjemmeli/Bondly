import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/Services/ProfileService/profile.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  ProfileByIdSubscription : Subscription |undefined;


  constructor(private profileService :ProfileService){}

  ProfileById =this.profileService.profileById;


  ngOnInit(): void {
    this.ProfileByIdSubscription =this.profileService.profileById$.subscribe(p=>{
      this.ProfileById = p
      console.log(p)
    });
    this.profileService.getProfileById()
  }
 

  ConvertDate(date:Date):string{
    date = new Date(date)
    const newDate=`${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
    return newDate;
  }
}
