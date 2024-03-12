import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { NavBarComponent } from '../components/navBar/navBar.component';
import { LoginComponent } from '../components/login/login.component';
import { BannerHomeComponent } from '../components/banner-home/banner-home.component';
import { AboutComponent } from '../components/about/about.component';
import { TokenService } from '../services/token.service';
import { EducationComponent } from '../components/education/education.component';
import { CertificationComponent } from '../components/certification/certification.component';
import { ExperienceComponent } from '../components/experience/experience.component';
import { SkillsComponent } from '../components/skills/skills.component';
import { ProjectComponent } from '../components/project/project.component';
import { ScrollToTopButtonComponent } from '../components/scroll-to-top-button/scroll-to-top-button.component';


@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [
        CommonModule, ScrollToTopButtonComponent, ProjectComponent, RouterOutlet, FooterComponent, NavBarComponent, LoginComponent, BannerHomeComponent, AboutComponent, EducationComponent, CertificationComponent, ExperienceComponent, SkillsComponent
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
})


export default class HomePageComponent implements OnInit {

    session = signal<boolean>(false)
    roles!: string[];
    isAdmin = signal<boolean>(false)


    constructor(private tokenService: TokenService) {
    }

    ngDoCheck() {
        this.checkSession();
    }

    ngOnInit(): void {
        // this.checkSession();
    }

    private checkSession(): void {
        const hasToken = !!this.tokenService.getToken();

        if (hasToken) {
            this.session.set(true);
            this.roles = this.tokenService.getAuthorities();
            this.isAdmin.set(this.roles.includes('ROLE_ADMIN'));
        }
    }


}
