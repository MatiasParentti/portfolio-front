
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NuevoUsuario } from '../model/nuevo-usuario';
import { LoginUsuario } from '../model/login-usuario';
import { JwtDTO } from '../model/jwt-dto';
import { environment } from '../environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    expURL = environment.apiUrl;

    private authURL = `${this.expURL}/auth/`;

    
    constructor(private httpClient: HttpClient) { }

    public nuevo(nuevoUsuario: NuevoUsuario): Observable<void> {
        return this.httpClient.post<void>(this.authURL + 'nuevo', nuevoUsuario)
            .pipe(
                catchError((error) => {
                    // Handle error here
                    throw error;
                })
            );
    }


    public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
        return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario)
            .pipe(
                catchError((error) => {
                    // Handle error here
                    throw error;
                })
            );

    }
}