import { Component, model, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CadastroComponent {
  private router = inject(Router);

  nome = model('');
  email = model('');
  senha = model('');
  confirmarSenha = model('');

  onSubmit() {
    console.log('Submetendo cadastro:', {
      nome: this.nome(),
      email: this.email(),
      senha: this.senha(),
      confirmarSenha: this.confirmarSenha(),
    });
    this.router.navigate(['/home']);
  }
}
