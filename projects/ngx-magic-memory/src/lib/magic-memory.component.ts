import { Component, inject, input, OnInit } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { GameService } from './services/game.service';
import { MemoryGameConfig } from './models/memory-game.config';
import { Card } from './models/card.model';

@Component({
  selector: 'magic-memory',
  imports: [CardComponent],
  providers: [GameService],
  templateUrl: './magic-memory.component.html',
  styleUrl: './magic-memory.component.scss',
})
export class MagicMemoryComponent implements OnInit {
  readonly config = input.required<MemoryGameConfig>();

  protected readonly game = inject(GameService);

  ngOnInit(): void {
    this.startGame();
  }

  onCardClick(card: Card): void {
    this.game.flipCard(card);
  }

  useHint(): void {
    this.game.useHint();
  }

  newGame(): void {
    this.startGame();
  }

  private startGame(): void {
    const cfg = this.config();
    this.game.startNewGame(cfg.items, cfg.hints ?? 3);
  }
}
