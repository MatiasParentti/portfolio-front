import { CommonModule } from '@angular/common';
import { Component, Input, signal, type OnInit } from '@angular/core';
import { Skill } from '../../model/skills';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { MsgAlertService } from '../../services/msg-alert.service';
import { SkillService } from '../../services/skills.service';
import { ToastService } from '../../services/toast.service';
import { InputSytleService } from '../../services/inputSytle.service';

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule
    ],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.css',
})
export class SkillsComponent {

    @Input() session!: boolean;
    @Input() isAdmin!: boolean;

    Skill: Skill[] = [];
    skillEdit: any;
    form: FormGroup;
    newSkill = false;
    editSkill = false;
    id: number = 0
    public style = signal(this.inputStyle)

    get urlSvgControl() {
        return this.form.get("urlSvg");
    }

    get nameSkillsControl() {
        return this.form.get("nameSkill");
    }

    get urlSvgValid() {
        return this.urlSvgControl?.touched && !this.urlSvgControl?.valid;
    }

    get nameSkillValid() {
        return this.nameSkillsControl?.touched && !this.nameSkillsControl?.valid;
    }

    constructor(private msgService: MsgAlertService, private mySkill: SkillService, private formBuilder: FormBuilder, private toast: ToastService, private inputStyle: InputSytleService) {

        this.form = this.formBuilder.group({

            urlSvg: ['', [Validators.required]],
            nameSkill: ['', [Validators.required]],


        })

        this.loadSkills();
    }

    toggleNewSkills(): void {
        this.newSkill = !this.newSkill;
    }

    cancel(): void {
        this.editSkill = false;
        this.newSkill = false;
        this.form.reset();
    }

    loadSkills(): void {
        this.mySkill.lista().subscribe(
            data => {
                this.Skill = data;
            },
            err => {
                console.log(err);
            }
        );
    }

    delete(id: number, nameSkill: string): void {
        const resp = this.msgService.msjAlert('Eliminar ' + nameSkill + ' ?');
        if (resp) {
            this.mySkill.delete(id).subscribe(
                () => {
                    this.toast.showSuccessToast('Experiencia eliminada')
                    this.loadSkills();
                },
                err => {
                    this.toast.showErrorToast(err.error.mensaje);
                }
            );
        }
    }

    edit(id: number): void {
        this.editSkill = true;
        this.id = id;

        this.mySkill.detail(id).subscribe(
            data => {
                this.skillEdit = data;
                this.form.patchValue({
                    urlSvg: this.skillEdit.urlSvg,
                    nameSkill: this.skillEdit.nameSkill,
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
            const skill = new Skill(
                isEdit ? this.id : this.Skill.length + 1,
                values.urlSvg,
                values.nameSkill,
            );

            const action = isEdit ? this.mySkill.update(this.id, skill) : this.mySkill.save(skill);

            action.subscribe(
                () => {
                    const message = isEdit ? 'Skill actualizada' : 'Skill creada';
                    this.toast.showSuccessToast(message)
                    this.loadSkills();
                },
                err => {
                    this.toast.showErrorToast(err.error.mensaje)
                    this.loadSkills();
                }
            );

            this.newSkill = false;
            this.editSkill = false;
            this.form.reset();
        } else {
            this.form.markAllAsTouched();
            console.log('error');
        }
    }


}
