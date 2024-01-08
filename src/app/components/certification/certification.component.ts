import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Certification } from '../../model/certification';
import { TokenService } from '../../services/token.service';
import { MsgAlertService } from '../../services/msg-alert.service';
import { CertificationService } from '../../services/certification.service';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-certification',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, FormsModule
    ],
    templateUrl: './certification.component.html',
    styleUrl: './certification.component.css',
})
export class CertificationComponent implements OnInit {

    @Input() session!: boolean;
    @Input() isAdmin!: boolean;

    form: FormGroup;
    getCertification: Certification[] = [];
    certificationEdit: any;
    ids: number = 0;
    newCert = false;
    editCert = false;

    constructor(
        private msgService: MsgAlertService,
        private myCertification: CertificationService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private tostada: ToastService
    ) {
        this.form = this.formBuilder.group({
            programa: ['', [Validators.required]],
            instituto: ['', [Validators.required, Validators.maxLength(300), Validators.minLength(3)]],
            enlace: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.loadCertifications();
    }

    loadCertifications(): void {
        this.myCertification.lista().subscribe(
            (data) => {
                this.getCertification = data;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    get programControl() {
        return this.form.get('programa');
    }

    get instituteControl() {
        return this.form.get('instituto');
    }

    get linkControl() {
        return this.form.get('enlace');
    }

    get programInvalid() {
        return this.programControl?.touched && !this.programControl?.valid;
    }

    get instituteInvalid() {
        return this.instituteControl?.touched && !this.instituteControl?.valid;
    }

    get linkInvalid() {
        return this.linkControl?.touched && !this.linkControl?.valid;
    }

    toggleNewCert() {
        this.newCert = !this.newCert;
    }

    cancel() {
        this.editCert = false;
        this.newCert = false;
        this.form.reset();
    }
    getInputStyle(control: AbstractControl | null): { [key: string]: string } {
        if (!control) {
            return {}; // O puedes devolver un estilo predeterminado si el control es nulo
        }

        return {
            'border-color': control?.errors && control?.touched ? 'tomato' : '#736b5e',
            'color': control?.errors && control?.touched ? 'tomato' : 'whitesmoke'
        };
    }

    deleteCertification(id: number, cargo: string, empresa: string) {
        const response = this.msgService.msjAlert(`Eliminar ${cargo} ${empresa}?`);
        if (response) {
            this.myCertification.delete(id).subscribe(
                () => {
                    this.tostada.showSuccessToast('Certificación eliminada')
                    this.loadCertifications();
                },
                (err) => {
                    this.toastr.error(err.error.mensaje, 'Fail', { timeOut: 3000, positionClass: 'toast-top-center' });
                }
            );
        }
        return false;
    }

    editCertification(id: number) {
        this.editCert = true;
        this.ids = id;
        this.myCertification.detail(id).subscribe(
            (data) => {
                this.certificationEdit = data;
                this.form.controls['programa'].patchValue(this.certificationEdit.programa);
                this.form.controls['instituto'].patchValue(this.certificationEdit.instituto);
                this.form.controls['enlace'].patchValue(this.certificationEdit.enlace);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    onFormSubmit(event: Event, isUpdate: boolean) {
        event.preventDefault();
        if (this.form.valid) {
            const values = this.form.value;
            const certification = isUpdate
                ? new Certification(this.ids, values.programa, values.instituto, values.enlace)
                : new Certification(
                    this.getCertification.length + 1,
                    values.programa,
                    values.instituto,
                    values.enlace
                );

            const observable = isUpdate
                ? this.myCertification.update(this.ids, certification)
                : this.myCertification.save(certification);

            observable.subscribe(
                () => {
                    const successMessage = isUpdate ? 'Certificado actualizado' : 'Certificación creada';
                    this.tostada.showSuccessToast(successMessage)
                    this.loadCertifications();
                },
                (err) => {
                    this.tostada.showErrorToast(err.error.mensaje)
                    this.loadCertifications();
                }
            );

            this.newCert = false;
            this.editCert = false;
            this.form.reset();
        } else {
            this.form.markAllAsTouched();
            console.log('error');
        }
    }


}


