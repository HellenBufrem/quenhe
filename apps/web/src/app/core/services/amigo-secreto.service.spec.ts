import { TestBed } from '@angular/core/testing';
import { AmigoSecretoService, Participante } from './amigo-secreto.service';
import { SupabaseService } from './supabase.service';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('AmigoSecretoService - Regras de Sorteio', () => {
  let service: AmigoSecretoService;
  let mockSupabaseClient: any;

  beforeEach(() => {
    const mockChain = {
      insert: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: {}, error: null })
    };

    mockChain.insert = vi.fn().mockImplementation(() => {
      return {
        select: vi.fn().mockImplementation(() => {
          return {
            single: vi.fn().mockResolvedValue({ data: { id: 'new-id', name: 'Test' }, error: null })
          };
        }),
        then: (cb: any) => Promise.resolve({ data: {}, error: null }).then(cb)
      };
    });

    mockChain.update = vi.fn().mockImplementation(() => {
      return {
        eq: vi.fn().mockImplementation(() => {
          return {
            select: vi.fn().mockImplementation(() => {
              return {
                single: vi.fn().mockResolvedValue({ data: {}, error: null })
              };
            }),
            then: (cb: any) => Promise.resolve({ data: {}, error: null }).then(cb)
          };
        }),
        then: (cb: any) => Promise.resolve({ data: {}, error: null }).then(cb)
      };
    });

    mockChain.delete = vi.fn().mockImplementation(() => {
      return {
        eq: vi.fn().mockResolvedValue({ error: null })
      };
    });

    mockSupabaseClient = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
        getUser: vi.fn().mockResolvedValue({ data: { user: null } })
      },
      from: vi.fn().mockReturnValue(mockChain)
    };

    TestBed.configureTestingModule({
      providers: [
        AmigoSecretoService,
        {
          provide: SupabaseService,
          useValue: { client: mockSupabaseClient }
        }
      ]
    });

    service = TestBed.inject(AmigoSecretoService);
  });

  it('deve lancar erro se o sorteio for realizado com menos de 3 participantes', async () => {
    const participantes: Participante[] = [
      { id: '1', nome: 'Ana', email: 'ana@email.com', status: 'Pronto', avatarUrl: '' },
      { id: '2', nome: 'Beto', email: 'beto@email.com', status: 'Pronto', avatarUrl: '' }
    ];

    await expect(service.realizarSorteio('grupo-id', participantes))
      .rejects
      .toThrow('Sorteio inválido: são necessários pelo menos 3 participantes.');
  });

  it('deve realizar o sorteio corretamente com 3 ou mais participantes', async () => {
    const participantes: Participante[] = [
      { id: '1', nome: 'Ana', email: 'ana@email.com', status: 'Pronto', avatarUrl: '' },
      { id: '2', nome: 'Beto', email: 'beto@email.com', status: 'Pronto', avatarUrl: '' },
      { id: '3', nome: 'Carlos', email: 'carlos@email.com', status: 'Pronto', avatarUrl: '' }
    ];

    let insertCalls: any[] = [];
    mockSupabaseClient.from = vi.fn().mockImplementation((table: string) => {
      if (table === 'draws') {
        return {
          insert: vi.fn().mockImplementation((drawsData: any[]) => {
            insertCalls = drawsData;
            return Promise.resolve({ error: null });
          })
        };
      }
      if (table === 'groups') {
        return {
          update: vi.fn().mockImplementation(() => {
            return {
              eq: vi.fn().mockResolvedValue({ error: null })
            };
          })
        };
      }
      return {};
    });

    await service.realizarSorteio('grupo-id', participantes);

    expect(mockSupabaseClient.from).toHaveBeenCalledWith('draws');
    expect(mockSupabaseClient.from).toHaveBeenCalledWith('groups');

    expect(insertCalls.length).toBe(3);
    
    insertCalls.forEach(draw => {
      expect(draw.giver_id).not.toBe(draw.receiver_id);
      expect(draw.group_id).toBe('grupo-id');
    });

    const givers = insertCalls.map(d => d.giver_id);
    const receivers = insertCalls.map(d => d.receiver_id);

    expect(new Set(givers).size).toBe(3);
    expect(new Set(receivers).size).toBe(3);
  });
});
