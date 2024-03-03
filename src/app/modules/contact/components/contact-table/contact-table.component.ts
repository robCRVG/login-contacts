import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactEvent } from 'src/app/models/enums/contacts/ContactEvent';
import { DeleteContactAction } from 'src/app/models/interfaces/contact/event/DeleteContactAction';
import { EventAction } from 'src/app/models/interfaces/contact/event/EventAction';
import { GetAllContactResponse } from 'src/app/models/interfaces/contact/response/getAllContactsResponse';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: [],
})
export class ContactTableComponent {
  @Input() contacts: Array<GetAllContactResponse> = [];
  @Output() contactEvent = new EventEmitter<EventAction>();
  @Output() deleteContactEvent = new EventEmitter<DeleteContactAction>();

  public contactSelected!: GetAllContactResponse;
  public addContactEvent = ContactEvent.ADD_CONTACT_EVENT;
  public editContactEvent = ContactEvent.EDIT_CONTACT_EVENT;

  handleContactEvent(action: string, id?: string): void {
    if (action && action !== '') {
      const productEventData = id && id !== '' ? { action, id } : { action };
      this.contactEvent.emit(productEventData);
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
}
