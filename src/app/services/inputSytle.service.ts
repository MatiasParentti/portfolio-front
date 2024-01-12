import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InputSytleService {

  constructor() { }

  getInputStyle(control: AbstractControl | null): { [key: string]: string } {
    if (!control) {
        return {}; // O puedes devolver un estilo predeterminado si el control es nulo
    }

    return {
        'border-color': control?.errors && control?.touched ? 'tomato' : '#736b5e',
        'color': control?.errors && control?.touched ? 'tomato' : 'whitesmoke'
    };
}


}
