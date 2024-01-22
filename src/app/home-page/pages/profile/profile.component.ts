import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NavBarComponent } from '../../../components/navBar/navBar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { Profile } from '../../../model/profile';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { ToastService } from '../../../services/toast.service';
import { InputSytleService } from '../../../services/inputSytle.service';
import { TokenService } from '../../../services/token.service';
import { BannerHomeComponent } from '../../../components/banner-home/banner-home.component';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        CommonModule, NavBarComponent, FooterComponent,BannerHomeComponent,ReactiveFormsModule
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
})

export default class ProfileComponent {

    Profile: Profile[] = [];
    editProfile = false;
    profileEdit: Profile | null = null;
    form: FormGroup;
    editId: number = 0;
    roles!: string[];
    isAdmin = signal(false)
    public style = signal(this.inputStyle)
    public session = signal(false)


    get nameControl() {
        return this.form.get("name");
    }
    get nameValid() {
        return this.nameControl?.touched && !this.nameControl?.valid;
    }
    get lastNameControl() {
        return this.form.get("lastname");
    }
    get lastNameValid() {
        return this.lastNameControl?.touched && !this.lastNameControl?.valid;
    }
    get aboutControl() {
        return this.form.get("about");
    }
    get aboutValid() {
        return this.aboutControl?.touched && !this.aboutControl?.valid;
    }
    get imageUrlControl() {
        return this.form.get("imageUrl");
    }
    get imageUrlValid() {
        return this.imageUrlControl?.touched && !this.imageUrlControl?.valid;
    }
    get emailControl() {
        return this.form.get("email");
    }
    get emailValid() {
        return this.emailControl?.touched && !this.emailControl?.valid;
    }
    get githubControl() {
        return this.form.get("github");
    }
    get githubValid() {
        return this.githubControl?.touched && !this.githubControl?.valid;
    }
    get linkedinControl() {
        return this.form.get("linkedin");
    }
    get linkedinValid() {
        return this.linkedinControl?.touched && !this.linkedinControl?.valid;
    }

    constructor(private tokenService: TokenService, private inputStyle: InputSytleService, private myProfile: ProfileService, private formBuilder: FormBuilder, private toast: ToastService) {

        this.form = this.formBuilder.group({

            name: ['', [Validators.required, Validators.maxLength(20)]],
            lastname: ['', [Validators.required, Validators.maxLength(20000)]],
            about: ['', [Validators.required, Validators.maxLength(2000)]],
            imageUrl: ['', [Validators.required, Validators.maxLength(1000)]],
            email: ['', [Validators.required, Validators.maxLength(200)]],
            github: ['', [Validators.required, Validators.maxLength(1000)]],
            linkedin: ['', [Validators.required, Validators.maxLength(1000)]],


        })

    }


    ngOnInit(): void {

        this.loadProfile()
    }

    loadProfile(): void {
        this.myProfile.lista().subscribe(
            data => {
                this.Profile = data;
            },
            err => {
                console.log(err);
            }
        );
    }

    cancel() {
        this.editProfile = false
    }

    edits(id: number): void {
        this.editProfile = true;
        this.editId = id;

        this.myProfile.detail(id).subscribe(
            data => {
                this.profileEdit = data;
                this.form.patchValue({

                    name: this.profileEdit.name,
                    lastname: this.profileEdit.lastname,
                    about: this.profileEdit.about,
                    imageUrl: this.profileEdit.imageUrl,
                    email: this.profileEdit.email,
                    github: this.profileEdit.github,
                    linkedin: this.profileEdit.linkedin

                });
            },
            err => {
                console.log(err);
            }
        );
    }

    onEdit(event: Event) {
        event.preventDefault;
        if (this.form.valid) {
            let values = this.form.value
            const add = new Profile(this.editId, values.name, values.lastname, values.about, values.imageUrl, values.email, values.github, values.linkedin)

            this.myProfile.update(this.editId, add).subscribe(
                data => {
                    const message = 'Perfil actualizado';
                    this.toast.showSuccessToast(message)
                    this.loadProfile();
                },
                err => {
                    this.toast.showErrorToast(err.error.mensaje)
                    this.loadProfile();
                }
            );

            this.editProfile = false;
            this.form.reset();
        } else {
            this.form.markAllAsTouched();
            console.log('error')
        }

    }

    private checkSession(): void {
        const hasToken = !!this.tokenService.getToken();

        if (hasToken) {
            this.session.set(true);
            this.roles = this.tokenService.getAuthorities();
            this.isAdmin.set(this.roles.includes('ROLE_ADMIN'));
        }
    }

    ngDoCheck() {
        this.checkSession();
    }


}
