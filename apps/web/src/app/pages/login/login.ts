import { Component } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HlmButton],
  templateUrl: './login.html'
})
export class LoginComponent {}
