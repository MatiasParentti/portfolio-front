import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from '../model/education';
import { environment } from '../environment';



@Injectable({
  providedIn: 'root'
})

export class EducationService {


  expURL = environment.apiUrl;

  private fullURL = `${this.expURL}/education/`;

  constructor(private httpClient: HttpClient) {
  }

  public lista(): Observable<Education[]> {
    return this.httpClient.get<Education[]>(this.fullURL + 'lista');
  }

  public detail(id: number): Observable<Education> {
    return this.httpClient.get<Education>(this.fullURL + `detail/${id}`);
  }

  public save(education: Education): Observable<any> {
    return this.httpClient.post<any>(this.fullURL + 'create', education);
  }

  public update(id: number, education: Education): Observable<any> {
    return this.httpClient.put<any>(this.fullURL + `update/${id}`, education);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.fullURL+ `delete/${id}`);
  }


}


