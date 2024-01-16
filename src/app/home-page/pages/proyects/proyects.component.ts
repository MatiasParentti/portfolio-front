import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../../../components/navBar/navBar.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
    selector: 'app-proyects',
    standalone: true,
    imports: [
        CommonModule, RouterOutlet, NavBarComponent, FooterComponent
    ],
    templateUrl: './proyects.component.html',
    styleUrl: './proyects.component.css',
})
export default class ProyectsComponent { }
