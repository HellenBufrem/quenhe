import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AmigoSecretoService, Grupo } from '../services/amigo-secreto.service';

export const grupoResolver: ResolveFn<Grupo> = (route) => {
  const codigo = route.paramMap.get('codigo');
  if (!codigo) {
    throw new Error('Código do grupo não fornecido');
  }
  return inject(AmigoSecretoService).obterGrupo(codigo);
};
