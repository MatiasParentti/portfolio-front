import { CommonModule } from '@angular/common';
import { Component, signal} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { MsgAlertService } from '../../services/msg-alert.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,RouterLink
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
  onLogOut(): void {
    const resp = this.myService.msjAlert('Cerrar Sesion?')
    if (resp) {
      this.tokenService.logOut();
      this.router.navigate(['/']);
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    }

  }

  constructor(private tokenService: TokenService, private router: Router,private myService: MsgAlertService,) { }

  ngDoCheck() {
    if (this.tokenService.getToken()) {
      this.session.set(true)
    } else {
      this.session.set(false)
    }
}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.session.set(true)
    } else {
      this.session.set(false)
    }
  }
}
