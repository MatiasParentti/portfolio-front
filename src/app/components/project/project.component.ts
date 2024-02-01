import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';
import { ProyectService } from '../../services/project.service';
import { Proyect } from '../../model/project';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-project',
    standalone: true,
    imports: [
        CommonModule,RouterLink, NgOptimizedImage 
    ],
    templateUrl: './project.component.html',
    styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {

    @Input() session!: boolean;
    @Input() isAdmin!: boolean;

    Proyects: Proyect[] = []

    constructor(private myProyect: ProyectService) {

    }

    ngOnInit(): void {

        this.loadProyects();

    }

    loadProyects(): void {
        this.myProyect.lista().subscribe(
            data => {
                this.Proyects = data;
            },
            err => {
                console.log(err);
            }
        );
    }

}
