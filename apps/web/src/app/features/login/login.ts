import { Component, ChangeDetectionStrategy, inject, model } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AmigoSecretoService } from '../../core/services/amigo-secreto.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private router = inject(Router);
  private amigoSecretoService = inject(AmigoSecretoService);

  email = model('');
  senha = model('');

  async onLogin() {
    try {
      await this.amigoSecretoService.login(this.email(), this.senha());
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Falha no login. Verifique suas credenciais.');
    }
  }
}
