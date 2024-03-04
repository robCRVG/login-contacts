import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { ContactEvent } from 'src/app/models/enums/contacts/ContactEvent';
import { EventAction } from 'src/app/models/interfaces/contact/event/EventAction';
import { CreateContactRequest } from 'src/app/models/interfaces/contact/request/CreateContactRequest';
import { EditContactRequest } from 'src/app/models/interfaces/contact/request/EditContactRequest';
import { GetAllContactResponse } from 'src/app/models/interfaces/contact/response/GetAllContactsResponse';
import { ContactService } from 'src/app/services/contact/contact.service';
import { ContactDataTransferService } from 'src/app/shared/services/contact/contact-data-transfer.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: [],
})
export class ContactFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public contactSelectedDatas!: GetAllContactResponse;
  public saleContactSelected!: GetAllContactResponse;
  public contactDatas: Array<GetAllContactResponse> = [];
  public addContactAction = ContactEvent.ADD_CONTACT_EVENT;
  public editContactAction = ContactEvent.EDIT_CONTACT_EVENT;
  public contactAction!: {
    event: EventAction;
    contactDatas: Array<GetAllContactResponse>;
  };
  public addContactForm = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    telefone: ['', Validators.required],
  });
  public editContactForm = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    telefone: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private contactService: ContactService,
    public ref: DynamicDialogConfig,
    private contactDtService: ContactDataTransferService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.contactAction = this.ref.data;
    this.contactAction?.event?.action === this.editContactAction && this.getContactDatas();
    this.getContactSelectedDatas(this.contactAction?.event?.id as string);
  }

  handleSubmitAddContact(): void {
    if (this.addContactForm?.value && this.addContactForm?.valid) {
      const requestCreateContact: CreateContactRequest = {
        nome: this.addContactForm.value.nome as string,
        email: this.addContactForm.value.email as string,
        telefone: this.addContactForm.value.telefone as string,
        dataCadastro: '2024-03-03',
        foto: "",
      };
      this.contactService
        .createContact(requestCreateContact)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Contato criado com sucesso',
                life: 2500,
              });
            }
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao criar produto',
              life: 2500,
            });
          },
        });
    }
    this.addContactForm.reset();
  }

  handleSubmitEditContact(): void {
    if (
      this.editContactForm.value &&
      this.editContactForm.valid &&
      this.contactAction.event.id
    ) {
      const reequestEditContact: EditContactRequest = {
        id: this.contactAction.event.id,
        nome: this.editContactForm.value.nome as string,
        email: this.editContactForm.value.email as string,
        telefone: this.editContactForm.value.telefone as string,
        foto: "",
        dataCadastro: "2023-08-28T00:00:00",
      };
      this.contactService
        .editContact(reequestEditContact)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Contato alterado com sucesso!',
              life: 2500,
            });
          },
        });
      this.editContactForm.reset();
    }
  }

  getDataCadastro(): string {
    var formattedDate: string;
    const currentDate = new Date();
    return (formattedDate = this.datePipe.transform(
      currentDate,
      'yyyy/MM/dd'
    ) as string);
  }

  getContactSelectedDatas(contactId: string): void {
    const allContacts = this.contactAction?.contactDatas;
    if (allContacts.length > 0) {
      const contactFiltered = allContacts.filter(
        (element) => element?.id === contactId
      );
      if (contactFiltered) {
        this.contactSelectedDatas = contactFiltered[0];
        this.editContactForm.setValue({
          nome: this.contactSelectedDatas?.nome,
          email: this.contactSelectedDatas?.email,
          telefone: this.contactSelectedDatas?.telefone
        });
      }
    }
  }

  getContactDatas(): void {
    this.contactService
      .getAllContacts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.contactDatas = response;
            this.contactDatas &&
              this.contactDtService.setContactDatas(this.contactDatas);
          }
        },
      });
  }

  onUpload(event: Event): void{

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
