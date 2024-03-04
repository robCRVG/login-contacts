import { MessageService } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactEvent } from 'src/app/models/enums/contacts/ContactEvent';
import { DeleteContactAction } from 'src/app/models/interfaces/contact/event/DeleteContactAction';
import { EventAction } from 'src/app/models/interfaces/contact/event/EventAction';
import { GetAllContactResponse } from 'src/app/models/interfaces/contact/response/GetAllContactsResponse';
import { ContactService } from 'src/app/services/contact/contact.service';
import { Subject, takeUntil } from 'rxjs';
import { FindContactByIdAction } from 'src/app/models/interfaces/contact/event/FindContactByIdAction';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: [],
})
export class ContactTableComponent {
  private destroy$ = new Subject<void>();
  @Input() contacts: Array<GetAllContactResponse> = [];
  @Output() contactEvent = new EventEmitter<EventAction>();
  @Output() deleteContactEvent = new EventEmitter<DeleteContactAction>();
  @Output() eventContactById = new EventEmitter<FindContactByIdAction>();



  public formGetContactId = this.formBuilder.group({
    idContato: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private messageService: MessageService
  ) {}

  public contactSelected!: GetAllContactResponse;
  public addContactEvent = ContactEvent.ADD_CONTACT_EVENT;
  public editContactEvent = ContactEvent.EDIT_CONTACT_EVENT;
  public findContactById = ContactEvent.FIND_CONTACT_EVENT;

  handleContactEvent(action: string, id?: string): void {
    if (action && action !== '') {
      const contactEventData = id && id !== '' ? { action, id } : { action };
      this.contactEvent.emit(contactEventData);
    }
  }

  handleDeleteContact(contactId: string, contactName: string): void {
    if (contactId !== '' && contactName !== '') {
      this.deleteContactEvent.emit({
        contactId,
        contactName,
      });
    }
  }

  handleContactById(id: string): void {
    if(id != ''){
      id = this.formGetContactId.value.idContato as string;
      this.eventContactById.emit({
        id
      });
    }

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
