import { Injectable } from '@angular/core';

export interface Participante {
  id?: string;
  nome: string;
  email: string;
  status: 'Pronto' | 'Pendente';
  avatarUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class AmigoSecretoService {
  private apiUrl = 'http://localhost:3000/participantes';

  async carregarParticipantes(): Promise<Participante[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to load participants: ${response.statusText}`);
    }
    return response.json();
  }

  async adicionarParticipante(dadosDoNovoParticipante: Participante): Promise<Participante> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosDoNovoParticipante),
    });
    if (!response.ok) {
      throw new Error(`Failed to add participant: ${response.statusText}`);
    }
    return response.json();
  }

  async atualizarStatusParticipante(id: string, status: 'Pronto' | 'Pendente'): Promise<Participante> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update participant status: ${response.statusText}`);
    }
    return response.json();
  }
}
