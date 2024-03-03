import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GetAllContactResponse } from 'src/app/models/interfaces/contact/response/getAllContactsResponse';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: [],
})
export class ContactHomeComponent implements OnInit {
  public contactList: Array<GetAllContactResponse> = [];

  constructor(
    private contactService: ContactService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getContactDatas();
  }

  getContactDatas(): void {
    this.contactService.getAllContacts().subscribe({
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
}
