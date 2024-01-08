import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginCardComponent } from '../loginCard/loginCard.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,LoginCardComponent,HttpClientModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent  {
   
}
