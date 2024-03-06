import { CommonModule } from '@angular/common';
import { Component, Input, signal, type OnInit } from '@angular/core';
import { Experience } from '../../model/experience';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExperienceService } from '../../services/experience.service';
import { MsgAlertService } from '../../services/msg-alert.service';
import { InputSytleService } from '../../services/inputSytle.service';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-experience',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule
    ],
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.css',
})
export class ExperienceComponent {

    @Input() session!: boolean;
    @Input() isAdmin!: boolean;

    form: FormGroup;
    Experience: Experience[] = [];
    experienceEdit: Experience | null = null;
    editId: number = 0;
    newExp = false;
    editExp = false;
    public style = signal(this.inputStyle)


    get positionControl() {
        return this.form.get("cargo");
    }

    get dateControl() {
        return this.form.get("fecha");
    }

    get companyControl() {
        return this.form.get("empresa");
    }

    get tasksControl() {
        return this.form.get("tareas");
    }

    get positionValid() {
        return this.positionControl?.touched && !this.positionControl?.valid;
    }

    get companyValid() {
        return this.companyControl?.touched && !this.companyControl?.valid;
    }

    get tasksValid() {
        return this.tasksControl?.touched && !this.tasksControl?.valid;
    }

    get dateValid() {
        return this.dateControl?.touched && !this.dateControl?.valid;
    }

    constructor(
        private msgService: MsgAlertService,
        private myExperience: ExperienceService,
        private formBuilder: FormBuilder,
        private toastServ: ToastService,
        private inputStyle: InputSytleService
    ) {
        this.form = this.formBuilder.group({
            cargo: ['', [Validators.required]],
            fecha: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
            tareas: ['', [Validators.required]],
            empresa: ['', [Validators.required]],
        });
        this.loadExperiences();
    }


    loadExperiences(): void {
        this.myExperience.lista().subscribe(
            data => {
                this.Experience = data;
            },
            err => {
                console.log(err);
            }
        );
    }

    toggleNewExp(): void {
        this.newExp = !this.newExp;
    }

    cancel(): void {
        this.editExp = false;
        this.newExp = false;
        this.form.reset();
    }

    delete(id: number, cargo: string, empresa: string): void {
        const resp = this.msgService.msjAlert('Eliminar ' + cargo + ' ' + empresa + '?');
        if (resp) {
            this.myExperience.delete(id).subscribe(
                () => {
                    this.toastServ.showSuccessToast('Experiencia eliminada')
                    this.loadExperiences();
                },
                err => {
                    this.toastServ.showErrorToast(err.error.mensaje);
                }
            );
        }
    }

    edit(id: number): void {
        this.editExp = true;
        this.editId = id;

        this.myExperience.detail(id).subscribe(
            data => {
                this.experienceEdit = data;
                this.form.patchValue({
                    cargo: this.experienceEdit.cargo,
                    fecha: this.experienceEdit.fecha,
                    tareas: this.experienceEdit.tareas,
                    empresa: this.experienceEdit.empresa
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
            const experience = new Experience(
                isEdit ? this.editId : this.Experience.length + 1,
                values.empresa,
                values.fecha,
                values.tareas,
                values.cargo
            );

            const action = isEdit ? this.myExperience.update(this.editId, experience) : this.myExperience.save(experience);

            action.subscribe(
                () => {
                    const message = isEdit ? 'Education actualizada' : 'Education creada';
                    this.toastServ.showSuccessToast(message)
                    this.loadExperiences();
                },
                err => {
                    this.toastServ.showErrorToast(err.error.mensaje)
                    this.loadExperiences();
                }
            );

            this.newExp = false;
            this.editExp = false;
            this.form.reset();
        } else {
            this.form.markAllAsTouched();
            console.log('error');
        }
    }



}
