import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../model/profile';
import { environment } from '../environment';




@Injectable({
  providedIn: 'root'
})

export class ProfileService {


  expURL = environment.apiUrl;

  private fullURL = `${this.expURL}/profile/`;


  constructor(private httpClient: HttpClient) {
  }

  public lista(): Observable<Profile[]> {
    return this.httpClient.get<Profile[]>(this.fullURL + 'lista');
  }

  public detail(id: number): Observable<Profile> {
    return this.httpClient.get<Profile>(this.fullURL + `detail/${id}`);
  }

  public save(profile: Profile): Observable<any> {
    return this.httpClient.post<any>(this.fullURL + 'create', profile);
  }

  public update(id: number, profile: Profile): Observable<any> {
    return this.httpClient.put<any>(this.fullURL + `update/${id}`, profile);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.fullURL + `delete/${id}`);
  }


}

