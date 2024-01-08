export class Profile {


  constructor(id: number, name: string, lastname: string, about: string, imageUrl: string, email: string, github: string, linkedin: string) {

      this.id = id
      this.name = name
      this.lastname = lastname
      this.about = about
      this.imageUrl = imageUrl
      this.email = email
      this.github = github
      this.linkedin = linkedin
  }


  id: number = 0
  name: string = ' '
  lastname: string = ' '
  about: string = ' '
  imageUrl: string = ' '
  email: string = ' '
  github: string = ''
  linkedin: string = ''
}