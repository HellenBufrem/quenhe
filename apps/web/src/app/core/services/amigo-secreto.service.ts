import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

export interface Participante {
  id?: string;
  nome: string;
  email: string;
  status: 'Pronto' | 'Pendente';
  avatarUrl: string;
  group_id?: string;
}

export interface Grupo {
  id: string;
  name: string;
  status: 'pending' | 'completed';
}

@Injectable({
  providedIn: 'root',
})
export class AmigoSecretoService {
  private supabase = inject(SupabaseService).client;

  private session$ = new Observable<any>((subscriber) => {
    // Busca a sessão inicial
    this.supabase.auth.getSession().then(({ data: { session } }) => {
      subscriber.next(session);
    });

    // Escuta mudanças de estado
    const { data: { subscription } } = this.supabase.auth.onAuthStateChange((event, session) => {
      subscriber.next(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  });

  usuarioLogado = toSignal(
    this.session$.pipe(
      map(session => session?.user ?? null)
    )
  );

  // --- AUTENTICAÇÃO ---
  async cadastrarUsuario(email: string, senha: string, nome: string): Promise<any> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          display_name: nome,
        },
      },
    });

    if (error) {
      throw new Error(`Erro ao cadastrar usuário: ${error.message}`);
    }

    return data;
  }

  async login(email: string, senha: string): Promise<any> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      throw new Error(`Erro ao fazer login: ${error.message}`);
    }

    return data;
  }

  async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw new Error(`Erro ao fazer logout: ${error.message}`);
    }
  }

  async obterUsuarioLogado(): Promise<any> {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
  }

  // --- GRUPOS ---
  async criarGrupo(nome: string): Promise<Grupo> {
    const { data, error } = await this.supabase
      .from('groups')
      .insert({ name: nome, status: 'pending' })
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao criar grupo: ${error.message}`);
    }

    return data;
  }

  async obterGrupo(id: string): Promise<Grupo> {
    const { data, error } = await this.supabase
      .from('groups')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Erro ao obter grupo: ${error.message}`);
    }

    return data;
  }

  // --- PARTICIPANTES ---
  async carregarParticipantes(): Promise<Participante[]> {
    // Retorna todos os participantes (fallback compatível com o mock)
    const { data, error } = await this.supabase
      .from('participants')
      .select('*');

    if (error) {
      throw new Error(`Erro ao carregar participantes: ${error.message}`);
    }

    return (data || []).map(p => ({
      id: p.id,
      nome: p.name,
      email: p.email,
      status: p.status,
      avatarUrl: p.avatar_url,
      group_id: p.group_id
    }));
  }

  async carregarParticipantesDoGrupo(groupId: string): Promise<Participante[]> {
    const { data, error } = await this.supabase
      .from('participants')
      .select('*')
      .eq('group_id', groupId);

    if (error) {
      throw new Error(`Erro ao carregar participantes do grupo: ${error.message}`);
    }

    return (data || []).map(p => ({
      id: p.id,
      nome: p.name,
      email: p.email,
      status: p.status,
      avatarUrl: p.avatar_url,
      group_id: p.group_id
    }));
  }

  async adicionarParticipante(dadosDoNovoParticipante: Participante): Promise<Participante> {
    const { data, error } = await this.supabase
      .from('participants')
      .insert({
        group_id: dadosDoNovoParticipante.group_id,
        name: dadosDoNovoParticipante.nome,
        email: dadosDoNovoParticipante.email,
        status: dadosDoNovoParticipante.status,
        avatar_url: dadosDoNovoParticipante.avatarUrl
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao adicionar participante: ${error.message}`);
    }

    return {
      id: data.id,
      nome: data.name,
      email: data.email,
      status: data.status,
      avatarUrl: data.avatar_url,
      group_id: data.group_id
    };
  }

  async atualizarStatusParticipante(id: string, status: 'Pronto' | 'Pendente'): Promise<Participante> {
    const { data, error } = await this.supabase
      .from('participants')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao atualizar status do participante: ${error.message}`);
    }

    return {
      id: data.id,
      nome: data.name,
      email: data.email,
      status: data.status,
      avatarUrl: data.avatar_url,
      group_id: data.group_id
    };
  }

  async removerParticipante(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('participants')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Erro ao remover participante: ${error.message}`);
    }
  }

  // --- SORTEIO (DRAW) ---
  async realizarSorteio(groupId: string, participantes: Participante[]): Promise<void> {
    if (participantes.length < 3) {
      throw new Error('Sorteio inválido: são necessários pelo menos 3 participantes.');
    }

    const shuffled = [...participantes];
    this.shuffle(shuffled);

    const draws = shuffled.map((giver, index) => {
      const receiver = shuffled[(index + 1) % shuffled.length];
      return {
        group_id: groupId,
        giver_id: giver.id,
        receiver_id: receiver.id,
      };
    });

    // Insere os pares de sorteio
    const { error: drawError } = await this.supabase
      .from('draws')
      .insert(draws);

    if (drawError) {
      throw new Error(`Erro ao persistir sorteio: ${drawError.message}`);
    }

    // Atualiza o status do grupo para "completed"
    const { error: groupError } = await this.supabase
      .from('groups')
      .update({ status: 'completed' })
      .eq('id', groupId);

    if (groupError) {
      throw new Error(`Erro ao atualizar status do grupo: ${groupError.message}`);
    }
  }

  async obterRevelacao(groupId: string, giverEmail: string): Promise<Participante | null> {
    // 1. Achar o participante correspondente ao email do giver no grupo
    const { data: participantData, error: participantError } = await this.supabase
      .from('participants')
      .select('*')
      .eq('group_id', groupId)
      .eq('email', giverEmail)
      .single();

    if (participantError || !participantData) {
      return null;
    }

    // 2. Achar a linha do sorteio correspondente a este participante como giver
    const { data: drawData, error: drawError } = await this.supabase
      .from('draws')
      .select('receiver_id')
      .eq('group_id', groupId)
      .eq('giver_id', participantData.id)
      .single();

    if (drawError || !drawData) {
      return null;
    }

    // 3. Buscar os dados do participante receiver
    const { data: receiverData, error: receiverError } = await this.supabase
      .from('participants')
      .select('*')
      .eq('id', drawData.receiver_id)
      .single();

    if (receiverError || !receiverData) {
      return null;
    }

    return {
      id: receiverData.id,
      nome: receiverData.name,
      email: receiverData.email,
      status: receiverData.status,
      avatarUrl: receiverData.avatar_url,
      group_id: receiverData.group_id
    };
  }

  private shuffle(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
