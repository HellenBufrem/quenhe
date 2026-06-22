import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const supabaseService = inject(SupabaseService);

  return from(supabaseService.client.auth.getSession()).pipe(
    switchMap(({ data: { session } }) => {
      const token = session?.access_token;

      if (token) {
        const clonedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
        return next(clonedReq);
      }

      return next(req);
    })
  );
};
