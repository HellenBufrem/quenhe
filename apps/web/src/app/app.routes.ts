import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login';
import { CadastroComponent } from './features/cadastro/cadastro';
import { HomeComponent } from './features/home/home';
import { DashboardComponent } from './features/dashboard/dashboard';
import { RevelacaoComponent } from './features/revelacao/revelacao';

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
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard/:codigo',
    component: DashboardComponent,
  },
  {
    path: 'revelacao',
    component: RevelacaoComponent,
  },
];
