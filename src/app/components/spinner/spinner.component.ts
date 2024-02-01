import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
    selector: 'app-spinner',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.css',
   
})
export class SpinnerComponent {
    isLoading$ = this.spinServ.isLoading$;

    constructor(private spinServ: SpinnerService) {

    }


}
