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
import { Router } from '@angular/router';
import { AmigoSecretoService, Participante, Grupo } from '../../core/services/amigo-secreto.service';
import { ParticipanteCardComponent } from '../../shared/components/participante-card/participante-card';

@Component({
  selector: 'app-dashboard',
  imports: [ParticipanteCardComponent],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private amigoSecretoService = inject(AmigoSecretoService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  codigo = input<string>();
  grupo = input<Grupo>();

  nomeGrupo = signal<string>('Carregando...');
  grupoStatus = signal<'pending' | 'completed'>('pending');
  participantesList = signal<Participante[]>([]);

  // Computed signal que garante que o sorteio só está disponível com >= 3 pessoas prontas e grupo pendente
  sorteioDisponivel = computed(() => {
    const list = this.participantesList();
    return (
      this.grupoStatus() === 'pending' &&
      list.length >= 3 &&
      list.every((p) => p.status === 'Pronto')
    );
  });

  constructor() {
    effect(() => {
      console.log('[Effect disparado] Código do grupo acessado: ' + this.codigo());
    });
  }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const groupId = this.codigo();
      if (!groupId) return;

      try {
        // 1. Carrega os dados do grupo pré-carregados pelo resolver
        const grupoPreCarregado = this.grupo();
        if (grupoPreCarregado) {
          this.nomeGrupo.set(grupoPreCarregado.name);
          this.grupoStatus.set(grupoPreCarregado.status);
        } else {
          const grupo = await this.amigoSecretoService.obterGrupo(groupId);
          this.nomeGrupo.set(grupo.name);
          this.grupoStatus.set(grupo.status);
        }

        // 2. Carrega participantes deste grupo específico
        const data = await this.amigoSecretoService.carregarParticipantesDoGrupo(groupId);
        this.participantesList.set(data);
      } catch (error) {
        console.error('Erro ao carregar dados do painel:', error);
        this.nomeGrupo.set('Grupo Não Encontrado');
      }
    }
  }

  async lidarComNotificacao(id: string) {
    console.log('Card clicado! ID:', id);
    const participante = this.participantesList().find((p) => p.id === id);
    if (!participante) return;

    // Se o sorteio já ocorreu, não permite alterar status dos participantes
    if (this.grupoStatus() === 'completed') {
      alert('O sorteio já foi concluído neste grupo.');
      return;
    }

    const novoStatus = participante.status === 'Pronto' ? 'Pendente' : 'Pronto';

    try {
      // Grava no Supabase
      await this.amigoSecretoService.atualizarStatusParticipante(id, novoStatus);

      // Atualiza o signal local para refletir na tela imediatamente
      this.participantesList.update((list) =>
        list.map((p) => (p.id === id ? { ...p, status: novoStatus } : p))
      );
    } catch (error) {
      console.error('Erro ao atualizar status do participante:', error);
    }
  }

  async lidarComRemocao(id: string) {
    if (this.grupoStatus() === 'completed') {
      alert('O sorteio já foi concluído neste grupo.');
      return;
    }

    if (!confirm('Deseja realmente remover este participante?')) {
      return;
    }

    try {
      await this.amigoSecretoService.removerParticipante(id);
      this.participantesList.update((list) => list.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Erro ao remover participante:', error);
      alert('Falha ao remover o participante.');
    }
  }

  async iniciarSorteio() {
    const groupId = this.codigo();
    if (!groupId) return;

    try {
      await this.amigoSecretoService.realizarSorteio(groupId, this.participantesList());
      this.grupoStatus.set('completed');
      
      // Direciona para a revelação passando o ID do grupo
      this.router.navigate(['/revelacao'], { queryParams: { grupo: groupId } });
    } catch (error) {
      console.error('Erro ao realizar sorteio:', error);
      alert('Falha ao realizar o sorteio.');
    }
  }

  irParaRevelacao() {
    this.router.navigate(['/revelacao'], { queryParams: { grupo: this.codigo() } });
  }
}
