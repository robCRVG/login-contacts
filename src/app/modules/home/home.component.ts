import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { UserService } from 'src/app/services/user/user.service';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private destroy$ = new Subject<void>();

  loginForm = this.formBuilder.group({
    login: ['', Validators.required],
    senha: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router
  ) {}

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService
        .authUser(this.loginForm.value as AuthRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.cookieService.set('USER_INFO', response?.token);
              this.loginForm.reset();
              // this.router.navigate(['/dashboard'])
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Bem vindo de volta Jonas da silva brito!',
                life: 2000,
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro ao fazer login!`,
              life: 2000,
            });
            console.log(err);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
