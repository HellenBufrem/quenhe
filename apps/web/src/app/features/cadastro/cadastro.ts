import { Component, model, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AmigoSecretoService } from '../../core/services/amigo-secreto.service';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CadastroComponent {
  private router = inject(Router);
  private amigoSecretoService = inject(AmigoSecretoService);

  nome = model('');
  email = model('');
  senha = model('');
  confirmarSenha = model('');

  async onSubmit() {
    if (this.senha() !== this.confirmarSenha()) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      await this.amigoSecretoService.cadastrarUsuario(
        this.email(),
        this.senha(),
        this.nome()
      );
      
      // Auto login após cadastro
      await this.amigoSecretoService.login(this.email(), this.senha());
      
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Erro ao cadastrar usuário no Supabase:', error);
      alert('Erro ao realizar cadastro.');
    }
  }
}
