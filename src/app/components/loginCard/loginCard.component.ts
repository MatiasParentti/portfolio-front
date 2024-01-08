import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginUsuario } from '../../model/login-usuario';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './loginCard.component.html',
  styleUrl: './loginCard.component.css',
})
export class LoginCardComponent implements OnInit {


  form: FormGroup;

  session = signal(false)
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj: string = 'usuario o contraseña incorrecta';


  get Password() {
    return this.form.get("password");
  }

  get User() {
    return this.form.get("user");
  }

  get PasswordValid() {
    return this.Password?.touched && !this.Password?.valid;
  }

  get UserValid() {
    return this.User?.touched && !this.User?.valid;
  }

  constructor(
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {

    this.form = this.formBuilder.group({

      password: ['', [Validators.required, Validators.minLength(3)]],
      user: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]

    })

  }


  ngOnInit(): void {
    this.checkSession();
  }

  private checkSession(): void {
    const hasToken = !!this.tokenService.getToken();
  
    if (hasToken) {
      this.session.set(true);
      this.roles = this.tokenService.getAuthorities();
    }
  }

  private showSuccessToast(nombreUsuario: string) {
    this.toastr.success(`Bienvenido ${nombreUsuario}`, 'Bienvenido', {
      timeOut: 5000,
      easeTime: 1000,
      progressBar: true,
      positionClass: 'toast-top-center',
    });
  }
  private handleFailedLogin() {
    this.session.set(false);
    this.toastr.error(this.errMsj, 'Error', {
      timeOut: 3000,
      easeTime: 300,
      positionClass: 'toast-top-center',
    });
  }


  onSession(event: Event) {
    event.preventDefault();
  
    if (this.form.valid) {
      this.nombreUsuario = this.form.controls['user'].value
      this.password = this.form.controls['password'].value
  
      this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
  
      this.authService.login(this.loginUsuario).subscribe(
        (data) => {
          this.handleSuccessfulLogin(data);
        },
        (err) => {
          this.handleFailedLogin();
        }
      );
    } else {
      this.form.markAllAsTouched();
      console.log('error');
    }
  }

  private handleSuccessfulLogin(data: any) {
    this.session.set(true);
    this.tokenService.setToken(data.token);
    this.tokenService.setUserName(data.nombreUsuario);
    this.tokenService.setAuthorities(data.authorities);
    this.roles = data.authorities;
  
    this.showSuccessToast(data.nombreUsuario);
  
    setTimeout(function () {
      window.location.reload();
    }, 5000);
  }



}


