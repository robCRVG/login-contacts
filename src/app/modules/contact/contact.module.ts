import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CONTACT_ROUTES } from './contact.routing';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactHomeComponent } from './page/contact-home/contact-home.component';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ContactTableComponent } from './components/contact-table/contact-table.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ConfirmationService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    ContactHomeComponent,
    ContactTableComponent,
    ContactFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(CONTACT_ROUTES),
    ToolbarModule,
    CardModule,
    ButtonModule,
    SharedModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule,
    FileUploadModule
  ],
  providers: [DialogService, ConfirmationService, DatePipe],
})
export class ContactModule {}
