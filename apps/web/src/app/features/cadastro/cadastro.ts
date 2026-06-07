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
    console.log('Submetendo cadastro:', {
      nome: this.nome(),
      email: this.email(),
      senha: this.senha(),
      confirmarSenha: this.confirmarSenha(),
    });

    try {
      await this.amigoSecretoService.adicionarParticipante({
        nome: this.nome(),
        email: this.email(),
        status: 'Pendente',
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(this.nome())}`
      });
    } catch (error) {
      console.error('Erro ao cadastrar participante no json-server:', error);
    }

    this.router.navigate(['/home']);
  }
}
