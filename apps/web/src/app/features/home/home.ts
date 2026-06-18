import { Component, model, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AmigoSecretoService } from '../../core/services/amigo-secreto.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private router = inject(Router);
  private amigoSecretoService = inject(AmigoSecretoService);

  nomeEvento = model('');
  codigoConvite = model('');

  async iniciarGrupo() {
    if (!this.nomeEvento()) {
      alert('Digite o nome do evento!');
      return;
    }

    try {
      const user = await this.amigoSecretoService.obterUsuarioLogado();
      if (!user) {
        alert('Faça login primeiro!');
        this.router.navigate(['/login']);
        return;
      }

      // 1. Criar o grupo no Supabase
      const grupo = await this.amigoSecretoService.criarGrupo(this.nomeEvento());

      // 2. Adicionar o criador como participante no grupo
      const nomeCriador = user.user_metadata?.['display_name'] || user.email?.split('@')[0] || 'Organizador';
      await this.amigoSecretoService.adicionarParticipante({
        group_id: grupo.id,
        nome: nomeCriador,
        email: user.email || '',
        status: 'Pendente',
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(nomeCriador)}`
      });

      this.router.navigate(['/dashboard', grupo.id]);
    } catch (error) {
      console.error('Erro ao iniciar grupo:', error);
      alert('Erro ao criar grupo no Supabase.');
    }
  }

  async acessarGrupo() {
    if (!this.codigoConvite()) {
      alert('Digite o código do convite!');
      return;
    }

    try {
      const user = await this.amigoSecretoService.obterUsuarioLogado();
      if (!user) {
        alert('Faça login primeiro!');
        this.router.navigate(['/login']);
        return;
      }

      const groupId = this.codigoConvite().trim();

      // 1. Verificar se o grupo existe
      const grupo = await this.amigoSecretoService.obterGrupo(groupId);
      if (!grupo) {
        alert('Grupo não encontrado!');
        return;
      }

      // 2. Carregar participantes existentes
      const participantes = await this.amigoSecretoService.carregarParticipantesDoGrupo(groupId);
      const jaParticipa = participantes.some(p => p.email === user.email);

      // 3. Se não participa, adiciona
      if (!jaParticipa) {
        const nomeParticipante = user.user_metadata?.['display_name'] || user.email?.split('@')[0] || 'Convidado';
        await this.amigoSecretoService.adicionarParticipante({
          group_id: groupId,
          nome: nomeParticipante,
          email: user.email || '',
          status: 'Pendente',
          avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(nomeParticipante)}`
        });
      }

      this.router.navigate(['/dashboard', groupId]);
    } catch (error) {
      console.error('Erro ao acessar grupo:', error);
      alert('Código de convite inválido ou grupo inexistente.');
    }
  }
}
