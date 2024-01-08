import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBarComponent } from '../../../components/navBar/navBar.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        CommonModule,NavBarComponent,FooterComponent
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
})
export default class ProfileComponent { }
