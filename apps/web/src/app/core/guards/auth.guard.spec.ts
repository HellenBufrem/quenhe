import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AmigoSecretoService } from '../services/amigo-secreto.service';
import { signal } from '@angular/core';
import { firstValueFrom, isObservable } from 'rxjs';
import { vi } from 'vitest';

describe('authGuard', () => {
  let mockAmigoSecretoService: any;
  let mockRouter: any;
  let usuarioLogadoSignal: any;

  beforeEach(() => {
    usuarioLogadoSignal = signal<any>(undefined);

    mockAmigoSecretoService = {
      usuarioLogado: usuarioLogadoSignal,
    };

    mockRouter = {
      navigate: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AmigoSecretoService, useValue: mockAmigoSecretoService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  const executeGuard = () => {
    return TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
  };

  it('should redirect to /login and return false if usuarioLogado is null', () => {
    usuarioLogadoSignal.set(null);
    const result = executeGuard();
    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should return true and not redirect if usuarioLogado is a valid user', () => {
    usuarioLogadoSignal.set({ email: 'test@test.com', nome: 'Test' });
    const result = executeGuard();
    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should wait and return true if usuarioLogado is initially undefined then resolves to a valid user', async () => {
    usuarioLogadoSignal.set(undefined);
    const resultPromise = executeGuard();

    expect(isObservable(resultPromise)).toBe(true);

    // Simula resolução assíncrona definindo o signal com um usuário válido
    setTimeout(() => {
      usuarioLogadoSignal.set({ email: 'test@test.com', nome: 'Test' });
    }, 10);

    const result = await firstValueFrom(resultPromise as any);
    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should wait and redirect to /login if usuarioLogado is initially undefined then resolves to null', async () => {
    usuarioLogadoSignal.set(undefined);
    const resultPromise = executeGuard();

    expect(isObservable(resultPromise)).toBe(true);

    // Simula resolução assíncrona definindo o signal com null
    setTimeout(() => {
      usuarioLogadoSignal.set(null);
    }, 10);

    const result = await firstValueFrom(resultPromise as any);
    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
