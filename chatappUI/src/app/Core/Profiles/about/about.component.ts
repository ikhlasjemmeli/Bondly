import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/Services/ProfileService/profile.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
   @Input() ProfileById: any;
  ProfileByIdSubscription : Subscription |undefined;


  constructor(private profileService :ProfileService){}

 


  ngOnInit(): void {
   
  }
 

  ConvertDate(date:Date):string{
    date = new Date(date)
    const newDate=`${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
    return newDate;
  }
}
