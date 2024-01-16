export class Proyect {


  constructor(id: number, name: string, liveCode: string, source: string, image: string, info: string, stack: string) {

      this.id = id
      this.name = name
      this.liveCode = liveCode
      this.source = source
      this.image = image
      this.info = info
      this.stack = stack
  }


  id: number = 0
  name: string = ' '
  liveCode: string = ' '
  source: string = ' '
  image: string = ' '
  info: string = ' '
  stack: string = ''
}