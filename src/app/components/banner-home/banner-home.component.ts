import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Profile } from '../../model/profile';
import { ProfileService } from '../../services/profile.service';


@Component({
    selector: 'app-banner-home',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './banner-home.component.html',
    styleUrl: './banner-home.component.css',
})
export class BannerHomeComponent implements OnInit {


    profiles: Profile[] = [];

    constructor(private profileService: ProfileService) {

    }

    ngOnInit(): void {
        this.loadProfiles();
    }

    loadProfiles(): void {
        this.profileService.lista().subscribe(
            data => this.profiles = data,
            error => console.error(error)
        );
    }














}
