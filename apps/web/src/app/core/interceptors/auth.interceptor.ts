import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { from, switchMap, catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);

  return from(supabaseService.client.auth.getSession()).pipe(
    switchMap(({ data: { session } }) => {
      const token = session?.access_token;
      let targetReq = req;

      if (token) {
        targetReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
      }

      return next(targetReq).pipe(
        catchError((error: any) => {
          if (error instanceof HttpErrorResponse) {
            console.error(`[Central Error Handler] Erro HTTP interceptado: Status ${error.status} - ${error.message}`);
            
            if (error.status === 401 || error.status === 403) {
              supabaseService.client.auth.signOut().then(() => {
                router.navigate(['/login']);
              });
            }
          }
          return throwError(() => error);
        })
      );
    })
  );
};
