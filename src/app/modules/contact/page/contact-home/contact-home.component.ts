import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/contact/event/EventAction';
import { ContactService } from 'src/app/services/contact/contact.service';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { GetAllContactResponse } from 'src/app/models/interfaces/contact/response/GetAllContactsResponse';

@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: [],
})
export class ContactHomeComponent implements OnInit {
  private destroy$ = new Subject<void>();
  public contactList: Array<GetAllContactResponse> = [];
  private ref!: DynamicDialogRef;

  constructor(
    private contactService: ContactService,
    private messageService: MessageService,
    private router: Router,
    private messageServiice: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getContactDatas();
  }

  getContactDatas(): void {
    this.contactService
      .getAllContacts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.contactList = response;
            console.log('Dados contatos', this.contactList);
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar contatos!',
            life: 2500,
          });
        },
      });
  }

  handleContactAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(ContactFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
          contactDatas: this.contactList,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAPIContactDatas(),
      });
    }
  }

  getAPIContactDatas() {
    this.contactService
      .getAllContacts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.contactList = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageServiice.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar contatos',
            life: 2500,
          });
          this.router.navigate(['/contato']);
        },
      });
  }

  handleDeleteContactAction(event: {
    contactId: string;
    contactName: string;
  }): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do contato: ${event?.contactName}?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-esclammtion-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteContact(event?.contactId),
      });
    }
  }

  deleteContact(contactId: string) {
    if (contactId) {
      this.contactService
        .deleteContact(contactId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageServiice.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Contato removido com sucesso!',
                life: 2500,
              });
              this.getAPIContactDatas();
            }
          },
          error: (err) => {
            console.log(err);
            this.messageServiice.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao remover contato!',
              life: 2500,
            });
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
