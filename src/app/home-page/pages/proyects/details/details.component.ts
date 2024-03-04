import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from '../../../../components/navBar/navBar.component';
import { BannerHomeComponent } from '../../../../components/banner-home/banner-home.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { Proyect } from '../../../../model/project';
import { ProyectService } from '../../../../services/project.service';
import { NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule, RouterLink, NavBarComponent, BannerHomeComponent, FooterComponent, NgOptimizedImage
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export default class DetailsComponent implements OnInit {

  @Input('id') proyectId!: number;
  Proyects: Proyect[] = []



  ngOnInit(): void {
    this.loadProyects();
  }

  constructor(private myProyect: ProyectService) {



  }

  loadProyects(): void {
    this.myProyect.detail(this.proyectId).subscribe(
      data => {
        this.Proyects.push(data)
      },
      err => {
        console.log(err);
      }
    );
  }


}
