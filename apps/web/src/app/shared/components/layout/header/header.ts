import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_DRAWER_ID } from '../layout.constants';
import { NAV_ITEMS } from '../nav-items';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
})
export class HeaderComponent {
  readonly drawerId = NAV_DRAWER_ID;
  readonly navItems = NAV_ITEMS;
}
