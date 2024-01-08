import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { NavBarComponent } from '../components/navBar/navBar.component';
import { LoginComponent } from '../components/login/login.component';
import { BannerHomeComponent } from '../components/banner-home/banner-home.component';
import { AboutComponent } from '../components/about/about.component';
import { TokenService } from '../services/token.service';
import { HttpClientModule } from '@angular/common/http';
import { EducationComponent } from '../components/education/education.component';


@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [
        CommonModule, RouterOutlet, FooterComponent, NavBarComponent, LoginComponent, BannerHomeComponent, AboutComponent, EducationComponent
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
})


export default class HomePageComponent implements OnInit {

    public session = signal(false)
    roles!: string[];
    isAdmin = signal(false)

   
    constructor(private tokenService: TokenService) { 

    }
   
      ngDoCheck(){
        this.checkSession();
      }

    ngOnInit(): void {
       this.checkSession();
      
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
