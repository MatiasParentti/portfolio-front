import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Experience } from '../model/experience';
import { environment } from '../environment';



@Injectable({
  providedIn: 'root'
})

export class ExperienceService {

  
  expURL = environment.apiUrl;

  private fullURL = `${this.expURL}/experience/`;

  constructor(private httpClient: HttpClient) {
  }

  public lista(): Observable<Experience[]> {
    return this.httpClient.get<Experience[]>(this.fullURL + 'lista');
  }

  public detail(id: number): Observable<Experience> {
    return this.httpClient.get<Experience>(this.fullURL + `detail/${id}`);
  }

  public save(experience: Experience): Observable<any> {
    return this.httpClient.post<any>(this.fullURL + 'create', experience);
  }

  public update(id: number, experience: Experience): Observable<any> {
    return this.httpClient.put<any>(this.fullURL + `update/${id}`, experience);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.fullURL+ `delete/${id}`);
  }


}

