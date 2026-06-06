import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-revelacao',
  imports: [RouterLink],
  templateUrl: './revelacao.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevelacaoComponent {
  isRevealed = signal(false);

  revealSecret() {
    this.isRevealed.set(true);
  }

  hideSecret() {
    this.isRevealed.set(false);
  }
}
