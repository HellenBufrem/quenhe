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
}
