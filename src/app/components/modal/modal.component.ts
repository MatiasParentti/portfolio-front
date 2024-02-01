import { CommonModule } from '@angular/common';
import { Component, signal, type OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TokenService } from '../../services/token.service';


@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [
        CommonModule
    ],

    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css',
})
export class ModalComponent {


    modalRef?: BsModalRef;
    message?: boolean;
    private session = signal(true)
    constructor(private modalService: BsModalService, private tokenService: TokenService) { }

    openModal(template: TemplateRef<void>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }

    confirm(): void {
        this.session.set(false);
        this.modalRef?.hide();
        this.tokenService.logOut();
        setTimeout(function () {
            window.location.reload();
        }, 500);
    }

    decline(): void {
        this.modalRef?.hide();
    }


}
