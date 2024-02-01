import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Certification } from '../model/certification';
import { environment } from '../environment';



@Injectable({
    providedIn: 'root'
})

export class CertificationService {

    expURL = environment.apiUrl;

    private fullURL = `${this.expURL}/certification/`;

    constructor(private httpClient: HttpClient) {
    }

    public lista(): Observable<Certification[]> {
        return this.httpClient.get<Certification[]>(this.fullURL + 'lista');
    }

    public detail(id: number): Observable<Certification> {
        return this.httpClient.get<Certification>(this.fullURL + `detail/${id}`);
    }

    public save(certification: Certification): Observable<any> {
        return this.httpClient.post<any>(this.fullURL + 'create', certification);
    }

    public update(id: number, certification: Certification): Observable<any> {
        return this.httpClient.put<any>(this.fullURL + `update/${id}`, certification);
    }

    public delete(id: number): Observable<any> {
        return this.httpClient.delete<any>(this.fullURL + `delete/${id}`);
    }


}