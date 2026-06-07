import {
  Component,
  signal,
  computed,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  PLATFORM_ID,
  input,
  effect,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AmigoSecretoService, Participante } from '../../core/services/amigo-secreto.service';
import { ParticipanteCardComponent } from '../../shared/components/participante-card/participante-card';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, ParticipanteCardComponent],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private amigoSecretoService = inject(AmigoSecretoService);
  private platformId = inject(PLATFORM_ID);

  codigo = input<string>();

  participantesList = signal<Participante[]>([]);

  // Computed signal que garante que o sorteio só está disponível com >= 3 pessoas prontas
  sorteioDisponivel = computed(() => {
    const list = this.participantesList();
    return list.length >= 3 && list.every((p) => p.status === 'Pronto');
  });

  constructor() {
    effect(() => {
      console.log('[Effect disparado] Código do grupo acessado: ' + this.codigo());
    });
  }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const data = await this.amigoSecretoService.carregarParticipantes();
        this.participantesList.set(data);
      } catch (error) {
        console.error('Erro ao carregar participantes:', error);
      }
    }
  }

  async lidarComNotificacao(id: string) {
    console.log('Card clicado! ID:', id);
    const participante = this.participantesList().find((p) => p.id === id);
    if (!participante) return;

    const novoStatus = participante.status === 'Pronto' ? 'Pendente' : 'Pronto';

    try {
      // Grava no json-server
      await this.amigoSecretoService.atualizarStatusParticipante(id, novoStatus);

      // Atualiza o signal local para refletir na tela imediatamente
      this.participantesList.update((list) =>
        list.map((p) => (p.id === id ? { ...p, status: novoStatus } : p))
      );
    } catch (error) {
      console.error('Erro ao atualizar status do participante:', error);
    }
  }
}
