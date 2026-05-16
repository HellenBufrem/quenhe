import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_DRAWER_ID } from '../layout.constants';
import { NAV_ITEMS } from '../nav-items';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav.html',
})
export class SidenavComponent {
  readonly drawerId = NAV_DRAWER_ID;
  readonly navItems = NAV_ITEMS;

  closeDrawer(): void {
    const toggle = document.getElementById(this.drawerId) as HTMLInputElement | null;
    if (toggle) {
      toggle.checked = false;
    }
  }
}
