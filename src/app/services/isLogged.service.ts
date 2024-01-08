import { Injectable, signal } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedService {



  public session = signal(false)
 

  constructor(public tokenService: TokenService,) { 
    
  }


  ngOnInit(): void {
   
    if (this.tokenService.getToken()) {
      this.session.set(true)
    } else {
      this.session.set(false)
    }

  
  }



}
