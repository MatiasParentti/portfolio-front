import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyect } from '../model/project';
import { environment } from '../environment';



@Injectable({
  providedIn: 'root'
})

export class ProyectService {


  expURL = environment.apiUrl;

  private fullURL = `${this.expURL}/work/`;


  constructor(private httpClient: HttpClient) {
  }

  public lista(): Observable<Proyect[]> {
    return this.httpClient.get<Proyect[]>(this.fullURL + 'lista');
  }

  public detail(id: number): Observable<Proyect> {
    return this.httpClient.get<Proyect>(this.fullURL + `detail/${id}`);
  }

  public save(work: Proyect): Observable<any> {
    return this.httpClient.post<any>(this.fullURL + 'create', work);
  }

  public update(id: number, work: Proyect): Observable<any> {
    return this.httpClient.put<any>(this.fullURL + `update/${id}`, work);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.fullURL + `delete/${id}`);
  }


}

