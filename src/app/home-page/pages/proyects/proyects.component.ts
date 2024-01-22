import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../../../components/navBar/navBar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { Proyect } from '../../../model/project';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';
import { ProyectService } from '../../../services/project.service';
import { MsgAlertService } from '../../../services/msg-alert.service';
import { TokenService } from '../../../services/token.service';
import { BannerHomeComponent } from '../../../components/banner-home/banner-home.component';
import { InputSytleService } from '../../../services/inputSytle.service';

@Component({
    selector: 'app-proyects',
    standalone: true,
    imports: [
        CommonModule, BannerHomeComponent, RouterLink, RouterOutlet, NavBarComponent, FooterComponent, FormsModule, ReactiveFormsModule
    ],
    templateUrl: './proyects.component.html',
    styleUrl: './proyects.component.css',
})
export default class ProyectsComponent {

    roles!: string[];
    form: FormGroup;
    Proyects: Proyect[] = []
    proyectEdit: Proyect | null = null;
    newProyect = false;
    editProyect = false;
    editId: number = 0;
    public style = signal(this.inputStyle)
    public session = signal(false)
    isAdmin = signal(false)

    get nameControl() {
        return this.form.get("name");
    }

    get infoControl() {
        return this.form.get("info");
    }

    get stackControl() {
        return this.form.get("stack");
    }

    get imageControl() {
        return this.form.get("image");
    }

    get liveCodeControl() {
        return this.form.get("liveCode");
    }

    get sourceControl() {
        return this.form.get("source");
    }

    get nameValid() {
        return this.nameControl?.touched && !this.nameControl?.valid;
    }

    get infoValid() {
        return this.infoControl?.touched && !this.infoControl?.valid;
    }

    get stackValid() {
        return this.stackControl?.touched && !this.stackControl?.valid;
    }

    get liveCodeValid() {
        return this.liveCodeControl?.touched && !this.liveCodeControl?.valid;
    }

    get imageValid() {
        return this.imageControl?.touched && !this.imageControl?.valid;
    }

    get sourceValid() {
        return this.sourceControl?.touched && !this.sourceControl?.valid;
    }


    constructor(private inputStyle: InputSytleService, private toast: ToastService, private router: Router, private myProyect: ProyectService, private msgService: MsgAlertService, private formBuilder: FormBuilder, private tokenService: TokenService) {

        this.form = this.formBuilder.group({

            name: ['', [Validators.required]],
            info: ['', [Validators.required]],
            stack: ['', [Validators.required]],
            image: ['', [Validators.required]],
            liveCode: ['', [Validators.required]],
            source: ['', [Validators.required]],

        })



    }

    ngOnInit(): void {
        this.loadProyects();
    }

    cancel(): void {
        this.editProyect = false;
        this.newProyect = false;
        this.form.reset();
    }

    backRoute() {
        this.router.navigate([''])
    }

    loadProyects(): void {
        this.myProyect.lista().subscribe(
            data => {
                this.Proyects = data;
            },
            err => {
                console.log(err);
            }
        );
    }

    btnNewProyect() {
        if (this.newProyect == false) {
            this.newProyect = true
        } else {
            this.newProyect = false
        }
    }

    delete(id: number, proyect: string): void {
        const resp = this.msgService.msjAlert('Eliminar ' + proyect + '?');
        if (resp) {
            this.myProyect.delete(id).subscribe(
                () => {
                    this.toast.showSuccessToast('Proyecto eliminado')
                    this.editProyect = false;
                    this.loadProyects();
                },
                err => {
                    this.toast.showErrorToast(err.error.mensaje);
                }
            );
        }
    }

    edit(id: number): void {
        this.editProyect = true;
        this.editId = id;

        this.myProyect.detail(id).subscribe(
            data => {
                this.proyectEdit = data;
                this.form.patchValue({

                    image: this.proyectEdit.image,
                    info: this.proyectEdit.info,
                    liveCode: this.proyectEdit.liveCode,
                    name: this.proyectEdit.name,
                    source: this.proyectEdit.source,
                    stack: this.proyectEdit.stack,

                });
            },
            err => {
                console.log(err);
            }
        );
    }

    onSubmit(event: Event, isEdit: boolean): void {
        event.preventDefault();
        if (this.form.valid) {
            const values = this.form.value;
            const proyect = new Proyect(
                isEdit ? this.editId : this.Proyects.length + 1,
                values.name,
                values.liveCode,
                values.source,
                values.image,
                values.info,
                values.stack
            );

            const action = isEdit ? this.myProyect.update(this.editId, proyect) : this.myProyect.save(proyect);

            action.subscribe(
                () => {
                    const message = isEdit ? 'Proyecto actualizado' : 'Proyecto creado';
                    this.toast.showSuccessToast(message)
                    this.loadProyects();
                },
                err => {
                    this.toast.showErrorToast(err.error.mensaje)
                    this.loadProyects();
                }
            );

            this.newProyect = false;
            this.editProyect = false;
            this.form.reset();
        } else {
            this.form.markAllAsTouched();
            console.log('error');
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
