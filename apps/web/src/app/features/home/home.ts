import { Component, model, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private router = inject(Router);

  nomeEvento = model('');
  codigoConvite = model('');

  iniciarGrupo() {
    console.log('Iniciar grupo clicado:', {
      nomeEvento: this.nomeEvento(),
    });
    const code = this.nomeEvento() ? encodeURIComponent(this.nomeEvento()) : 'novo-grupo';
    this.router.navigate(['/dashboard', code]);
  }

  acessarGrupo() {
    console.log('Acessar grupo clicado:', {
      codigoConvite: this.codigoConvite(),
    });
    const code = this.codigoConvite() || 'XRT-998';
    this.router.navigate(['/dashboard', code]);
  }
}
