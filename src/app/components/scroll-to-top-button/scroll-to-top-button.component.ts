import { CommonModule } from '@angular/common';
import { Component, HostListener, type OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './scroll-to-top-button.component.html',
  styles: `
    
    .scroll-to-top {
    position: fixed;
    bottom: 15px;
    right: 15px;
    opacity: 0;
    transition: all .2s ease-in-out;
   }
   .show-scrollTop {
    opacity: 1;
    transition: all .2s ease-in-out;
    background-color: #a2da5a;
   }
   button{
    display: inline-block;
  background-color: #a2da5a;
  color: black!important;
  padding: 0.7rem 1rem;
  font-weight: 500;
  border-radius: 0.2rem;
  text-decoration: none;
  border: none;

   }

  `,
})
export class ScrollToTopButtonComponent {

  windowScrolled: boolean = false;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    // Cuando el usuario haga scroll, verifica si se ha desplazado una cierta distancia
    // para decidir si mostrar el botón de "Scroll to Top"
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    // Función para desplazarse suavemente hacia arriba cuando se hace clic en el botón
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


}





