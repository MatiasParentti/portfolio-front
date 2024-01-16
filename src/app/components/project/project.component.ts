import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';

@Component({
    selector: 'app-project',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './project.component.html',
    styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {

    @Input() session!: boolean;
    @Input() isAdmin!: boolean;

    ngOnInit(): void { }

}
