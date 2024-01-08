import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Certification } from '../model/certification';



@Injectable({
    providedIn: 'root'
})

export class CertificationService {

    expURL = 'http://localhost:8080/certification/'


    constructor(private httpClient: HttpClient) {



    }

    public lista(): Observable<Certification[]> {
        return this.httpClient.get<Certification[]>(this.expURL + 'lista');
    }

    public detail(id: number): Observable<Certification> {
        return this.httpClient.get<Certification>(this.expURL + `detail/${id}`);
    }

    public save(certification: Certification): Observable<any> {
        return this.httpClient.post<any>(this.expURL + 'create', certification);
    }

    public update(id: number, certification: Certification): Observable<any> {
        return this.httpClient.put<any>(this.expURL + `update/${id}`, certification);
    }

    public delete(id: number): Observable<any> {
        return this.httpClient.delete<any>(this.expURL + `delete/${id}`);
    }


}