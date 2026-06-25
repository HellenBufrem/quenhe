import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AmigoSecretoService } from '../../core/services/amigo-secreto.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private router = inject(Router);
  private amigoSecretoService = inject(AmigoSecretoService);
  private fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onLogin() {
    if (this.loginForm.invalid) return;

    const { email, senha } = this.loginForm.getRawValue();
    try {
      await this.amigoSecretoService.login(email, senha);
      this.router.navigate(['/criacao-grupo']);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Falha no login. Verifique suas credenciais.');
    }
  }
}
