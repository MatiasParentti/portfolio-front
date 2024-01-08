import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../model/profile';




@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  expURL = 'http://localhost:8080/profile/'


  constructor(private httpClient: HttpClient) {

  }

  public lista(): Observable<Profile[]> {
    return this.httpClient.get<Profile[]>(this.expURL + 'lista');
  }

  public detail(id: number): Observable<Profile> {
    return this.httpClient.get<Profile>(this.expURL + `detail/${id}`);
  }

  public save(profile: Profile): Observable<any> {
    return this.httpClient.post<any>(this.expURL + 'create', profile);
  }

  public update(id: number, profile: Profile): Observable<any> {
    return this.httpClient.put<any>(this.expURL + `update/${id}`, profile);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.expURL + `delete/${id}`);
  }


}

