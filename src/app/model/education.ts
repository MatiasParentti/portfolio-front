export class Education {


  constructor(id: number, instituto: string, fecha: string, programa: string, estado: string) {

      this.id = id
      this.instituto = instituto
      this.fecha = fecha
      this.programa = programa
      this.estado = estado

  }

  id: number = 0
  instituto: string = ' '
  fecha: string = ' '
  programa: string = ' '
  estado: string = ' '

}