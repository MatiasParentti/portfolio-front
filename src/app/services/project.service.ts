import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyect } from '../model/project';



@Injectable({
    providedIn: 'root'
})

export class ProyectService {

    expURL = 'https://backendargprogh.onrender.com/work/'


    constructor(private httpClient: HttpClient) {



    }

    public lista(): Observable<Proyect[]> {
        return this.httpClient.get<Proyect[]>(this.expURL + 'lista');
      }
    
      public detail(id: number): Observable<Proyect> {
        return this.httpClient.get<Proyect>(this.expURL + `detail/${id}`);
      }
    
      public save(work: Proyect): Observable<any> {
        return this.httpClient.post<any>(this.expURL + 'create', work);
      }
    
      public update(id: number, work: Proyect): Observable<any> {
        return this.httpClient.put<any>(this.expURL + `update/${id}`, work);
      }
    
      public delete(id: number): Observable<any> {
        return this.httpClient.delete<any>(this.expURL + `delete/${id}`);
      }


}

