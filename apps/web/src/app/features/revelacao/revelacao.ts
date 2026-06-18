import { Component, signal, ChangeDetectionStrategy, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AmigoSecretoService, Participante } from '../../core/services/amigo-secreto.service';

@Component({
  selector: 'app-revelacao',
  imports: [RouterLink],
  templateUrl: './revelacao.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevelacaoComponent implements OnInit {
  private amigoSecretoService = inject(AmigoSecretoService);

  grupo = input<string>();

  isRevealed = signal(false);
  amigoSecreto = signal<Participante | null>(null);
  carregando = signal(true);
  erro = signal<string | null>(null);

  async ngOnInit() {
    const groupId = this.grupo();
    if (!groupId) {
      this.erro.set('Código do grupo não fornecido.');
      this.carregando.set(false);
      return;
    }

    try {
      const user = await this.amigoSecretoService.obterUsuarioLogado();
      if (!user) {
        this.erro.set('Você precisa estar logado para ver seu amigo secreto.');
        this.carregando.set(false);
        return;
      }

      const resultado = await this.amigoSecretoService.obterRevelacao(groupId, user.email || '');
      if (resultado) {
        this.amigoSecreto.set(resultado);
      } else {
        this.erro.set('Você não está cadastrado neste grupo ou o sorteio ainda não foi realizado.');
      }
    } catch (e) {
      console.error(e);
      this.erro.set('Erro ao carregar revelação do amigo secreto.');
    } finally {
      this.carregando.set(false);
    }
  }

  revealSecret() {
    this.isRevealed.set(true);
  }

  hideSecret() {
    this.isRevealed.set(false);
  }
}
