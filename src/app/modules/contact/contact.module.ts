import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CONTACT_ROUTES } from './contact.routing';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactHomeComponent } from './page/contact-home/contact-home.component';

@NgModule({
  declarations: [ContactHomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(CONTACT_ROUTES),
    ToolbarModule,
    CardModule,
    ButtonModule,
    SharedModule,
  ],
})
export class ContactModule {}
