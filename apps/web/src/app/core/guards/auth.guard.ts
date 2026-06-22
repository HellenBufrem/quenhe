import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AmigoSecretoService } from '../services/amigo-secreto.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(AmigoSecretoService);
  const router = inject(Router);

  const usuario = service.usuarioLogado();

  if (usuario === undefined) {
    // Ainda carregando o estado inicial, aguardamos a resolução
    return toObservable(service.usuarioLogado).pipe(
      filter(u => u !== undefined),
      take(1),
      map(u => {
        if (!u) {
          router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }

  if (!usuario) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
