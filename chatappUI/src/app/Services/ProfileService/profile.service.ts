import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileByIdSubject = new BehaviorSubject<any[]>([]);
  profileById$ = this.profileByIdSubject.asObservable();
  profileById:any;
  baseUrl: string = 'https://localhost:7166/api/Profile/';

  constructor(private http: HttpClient) {}

  getProfileById(): void {
    const connectedUserJson = localStorage.getItem('ConnectedUser');
    if (connectedUserJson) {
      const connectedUser = JSON.parse(connectedUserJson);
      const id = connectedUser.id;

      console.log("L'ID extrait est :", id);

      this.http.get<any[]>(`${this.baseUrl}GetProfileById?UserId=${id}`).subscribe(
        (profile) => {
          // Utilisez le BehaviorSubject pour émettre les données
          this.profileByIdSubject.next(profile);
        },
        (error) => {
          console.error('Erreur lors de la récupération du profil', error);
        }
      );
    } else {
      console.log("Aucun utilisateur connecté trouvé dans le localStorage.");
    }
  }
}
