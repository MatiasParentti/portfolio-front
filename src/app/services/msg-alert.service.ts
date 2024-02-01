import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MsgAlertService {

  constructor() { 


  }

  
  msjAlert(mensaje: string) {
    const result = window.confirm(mensaje)

    return result

  }

}








  

