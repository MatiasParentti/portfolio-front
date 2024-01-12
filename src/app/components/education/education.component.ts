import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Education } from '../../model/education';
import { EducationService } from '../../services/education.service';
import { ToastrService } from 'ngx-toastr';
import { MsgAlertService } from '../../services/msg-alert.service';

@Component({
    selector: 'app-education',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule
    ],
    templateUrl: './education.component.html',
    styleUrl: './education.component.css',
})
export class EducationComponent implements OnInit {

    @Input() session!: boolean;
    @Input() isAdmin!: boolean;

    form: FormGroup;
    educations: Education[] = [];
    editEducation: Education | undefined;
    newStudy = false;
    editExp = false;
    editId: number = 0;

    constructor(
        private msgService: MsgAlertService,
        private educationService: EducationService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService
    ) {
        this.form = this.formBuilder.group({
            instituto: ['', [Validators.required]],
            fecha: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
            programa: ['', [Validators.required]],
            estado: ['', [Validators.required]],
        });
    }

    get Instituto() {
        return this.form.get("instituto");
    }

    get Fecha() {
        return this.form.get("fecha");
    }

    get Programa() {
        return this.form.get("programa");
    }

    get Estado() {
        return this.form.get("estado");
    }

    get InstitutoValid() {
        return this.Instituto?.touched && !this.Instituto?.valid;
    }

    get EstadoValid() {
        return this.Estado?.touched && !this.Estado?.valid;
    }

    get ProgramaValid() {
        return this.Programa?.touched && !this.Programa?.valid;
    }

    get FechaValid() {
        return this.Fecha?.touched && !this.Fecha?.valid;
    }


    ngOnInit(): void {
        this.loadEducation();
    }

    // En tu componente.ts
    getInputStyle(control: AbstractControl | null): { [key: string]: string } {
        if (!control) {
            return {}; // O puedes devolver un estilo predeterminado si el control es nulo
        }

        return {
            'border-color': control?.errors && control?.touched ? 'tomato' : '#736b5e',
            'color': control?.errors && control?.touched ? 'tomato' : 'whitesmoke'
        };
    }

    loadEducation(): void {
        this.educationService.lista().subscribe(
            data => this.educations = data,
            err => console.error(err)
        );
    }

    cancel(): void {
        this.newStudy = false;
        this.editExp = false;
        this.form.reset();
    }

    toggleNewStudy(): void {
        this.newStudy = !this.newStudy;
    }

    onSubmit(event: Event, isEdit: boolean): void {
        event.preventDefault();
        if (this.form.valid) {
            const values = this.form.value;
            const education = new Education(
                isEdit ? this.editId : this.educations.length + 1,
                values.instituto,
                values.fecha,
                values.programa,
                values.estado
            );

            const action = isEdit ? this.educationService.update(this.editId, education) : this.educationService.save(education);

            action.subscribe(
                () => {
                    const message = isEdit ? 'Education actualizada' : 'Education creada';
                    this.toastr.success(message, 'Success', {
                        timeOut: 3000,
                        easeTime: 1000,
                        progressBar: true,
                        positionClass: 'toast-top-center',
                      });
                    this.loadEducation();
                },
                err => {
                    this.toastr.error(err.error.mensaje, 'Error', { timeOut: 3000, positionClass: 'toast-top-center' });
                    this.loadEducation();
                }
            );

            this.newStudy = false;
            this.editExp = false;
            this.form.reset();
        } else {
            this.form.markAllAsTouched();
            console.log('error');
        }
    }

    edit(id: number): void {
        this.editExp = true;
        this.editId = id;

        this.educationService.detail(id).subscribe(
            data => {
                this.editEducation = data;
                this.form.patchValue({
                    fecha: this.editEducation.fecha,
                    instituto: this.editEducation.instituto,
                    programa: this.editEducation.programa,
                    estado: this.editEducation.estado
                });
            },
            err => console.error(err)
        );
    }

    delete(id: number, programa: string): void {
        const resp = this.msgService.msjAlert(`Eliminar ${programa}?`);

        if (resp) {
            this.educationService.delete(id).subscribe(
                () => {
                    this.toastr.success('Education eliminada', 'OK', { timeOut: 3000, positionClass: 'toast-top-center' });
                    this.loadEducation();
                },
                err => {
                    this.toastr.error(err.error.mensaje, 'Fail', { timeOut: 3000, positionClass: 'toast-top-center' });
                }
            );
        }
    }
}
