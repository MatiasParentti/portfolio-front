export class Experience{

  id: number = 0
  empresa: string = ' '
  fecha: string = ' '
  tareas: string = ' '
  cargo: string = ' '
  

  constructor(id:number, empresa:string, fecha:string, tareas:string, cargo:string){

      this.id = id
      this.empresa = empresa
      this.fecha =fecha
      this.tareas =tareas
      this.cargo = cargo

  }


}
