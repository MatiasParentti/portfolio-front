
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../model/skills';
import { environment } from '../environment';


@Injectable({
    providedIn: 'root'
})

export class SkillService {



    expURL = environment.apiUrl;

    private fullURL = `${this.expURL}/skill/`;


    constructor(private httpClient: HttpClient) {
    }


    public lista(): Observable<Skill[]> {
        return this.httpClient.get<Skill[]>(this.fullURL + 'lista');
    }

    public detail(id: number): Observable<Skill> {
        return this.httpClient.get<Skill>(this.fullURL + `detail/${id}`);
    }

    public save(skill: Skill): Observable<any> {
        return this.httpClient.post<any>(this.fullURL + 'create', skill);
    }

    public update(id: number, skill: Skill): Observable<any> {
        return this.httpClient.put<any>(this.fullURL + `update/${id}`, skill);
    }

    public delete(id: number): Observable<any> {
        return this.httpClient.delete<any>(this.fullURL + `delete/${id}`);
    }



}
