import {
  Component,
  signal,
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

  lidarComNotificacao(id: string) {
    console.log('Card clicado! ID:', id);
  }
}
