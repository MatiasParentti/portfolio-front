import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import HomePageComponent from './home-page/home-page.component';
import { ScrollToTopButtonComponent } from './components/scroll-to-top-button/scroll-to-top-button.component';
import { filter } from 'rxjs';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SpinnerComponent, HomePageComponent, ScrollToTopButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {

  constructor(
    router: Router
  ) {
    router.events
      .pipe(filter((routerEvent: Event) => routerEvent instanceof NavigationEnd))
      .subscribe(() => window.scrollTo(0, 0));
  }


}
