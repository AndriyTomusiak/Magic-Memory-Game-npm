import { Component, input, output } from '@angular/core';
import { Card } from '../../models/card.model';

@Component({
  selector: 'mm-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  readonly card = input.required<Card>();
  readonly cardBack = input<string>('?');
  readonly cardClick = output<Card>();

  isImage(value: string): boolean {
    return /\.(png|jpe?g|svg|webp|gif|avif)(\?.*)?$/i.test(value) || value.startsWith('data:image/');
  }

  onClick(): void {
    this.cardClick.emit(this.card());
  }
}
