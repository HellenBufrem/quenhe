import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/layout/footer/footer';
import { HeaderComponent } from './shared/components/layout/header/header';
import { SidenavComponent } from './shared/components/layout/sidenav/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidenavComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
