import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Profile } from '../../model/profile';
import { ProfileService } from '../../services/profile.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [
        CommonModule,NgOptimizedImage
    ],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css',
})
export class AboutComponent {

    @Input({required: true}) session!: boolean;
    @Input({required: true}) isAdmin!: boolean;

    profiles: Profile[] = [];
    editProfile: any;

    edit = false
    editId: number = 0;

    constructor(private profileService: ProfileService) {

    }

    

    btnNewExp() {
        if (this.edit == false) {
            this.edit = true

        } else {
            this.edit = false
        }
    }

    loadProfiles(): void {
        this.profileService.lista().subscribe(
            data => this.profiles = data,
            error => console.error(error)
        );
    }

    ngOnInit(): void {
        this.loadProfiles();
    }


}
