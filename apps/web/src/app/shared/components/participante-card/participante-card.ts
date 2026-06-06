import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Participante } from '../../../core/services/amigo-secreto.service';

@Component({
  selector: 'app-participante-card',
  imports: [UpperCasePipe],
  templateUrl: './participante-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipanteCardComponent {
  dados = input.required<Participante>();
  notificar = output<string>();

  emitirNotificacao() {
    this.notificar.emit(this.dados().id || '');
  }
}
