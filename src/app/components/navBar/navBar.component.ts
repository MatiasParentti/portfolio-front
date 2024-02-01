import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ModalComponent
  ],
  templateUrl: './navBar.component.html',
  styleUrl: './navBar.component.css',
})
export class NavBarComponent {


  public session = signal(false)

  linkGroup = "linkGroup";


  cerrar() {
    if (this.linkGroup == "linkGroup") {
      this.linkGroup = "linkGroup active";
    } else {
      this.linkGroup = "linkGroup"
    }
  }
  
  constructor(private tokenService: TokenService) { }

  ngDoCheck() {
    if (this.tokenService.getToken()) {
      this.session.set(true)
    } else {
      this.session.set(false)
    }
  }

  
}
