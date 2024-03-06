import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Profile } from '../../model/profile';
import { ProfileService } from '../../services/profile.service';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
})
export class FooterComponent {



    profiles: Profile[] = [];

    constructor(private profileService: ProfileService) {
        this.loadProfiles();
    }


    loadProfiles(): void {
        this.profileService.lista().subscribe(
            data => this.profiles = data,
            error => console.error(error)
        );
    }









}
