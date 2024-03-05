import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    roles: Array<string> = [];

    constructor() { }

    public setToken(token: string): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string {
        return localStorage.getItem(TOKEN_KEY)!;
    }

    public setUserName(userName: string): void {
        localStorage.removeItem(USERNAME_KEY);
        localStorage.setItem(USERNAME_KEY, userName);
    }

    public getUserName(): string {
        return localStorage.getItem(USERNAME_KEY)!;
    }

    public setAuthorities(authorities: string[]): void {
        localStorage.removeItem(AUTHORITIES_KEY);
        localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    }

    public getAuthorities(): string[] {
        this.roles = [];
        if (localStorage.getItem(AUTHORITIES_KEY)) {
            JSON.parse(localStorage.getItem(AUTHORITIES_KEY)!).forEach((authority: any) => {
                this.roles.push(authority.authority);
            });
        }
        
        return this.roles;
    }

    public logOut(): void {
        localStorage.clear();
    }
}
