import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login';
import { CadastroComponent } from './features/cadastro/cadastro';
import { HomeComponent } from './features/home/home';
import { DashboardComponent } from './features/dashboard/dashboard';
import { RevelacaoComponent } from './features/revelacao/revelacao';
import { PanelLayoutComponent } from './shared/components/layout/panel-layout';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: '',
    component: PanelLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'criacao-grupo',
        component: HomeComponent,
      },
      {
        path: 'home',
        redirectTo: 'criacao-grupo',
        pathMatch: 'full',
      },
      {
        path: 'dashboard/:codigo',
        component: DashboardComponent,
      },
      {
        path: 'revelacao',
        component: RevelacaoComponent,
      },
    ],
  },
];
