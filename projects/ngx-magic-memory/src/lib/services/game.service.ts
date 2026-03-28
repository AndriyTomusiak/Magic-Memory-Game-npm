import { Injectable, signal, computed } from '@angular/core';
import { Card } from '../models/card.model';

@Injectable()
export class GameService {
  readonly cards = signal<Card[]>([]);
  readonly moves = signal(0);
  readonly firstPick = signal<Card | null>(null);
  readonly secondPick = signal<Card | null>(null);
  readonly locked = signal(false);
  readonly hints = signal(3);
  readonly hintActive = signal(false);

  readonly matchedPairs = computed(() =>
    this.cards().filter(c => c.matched).length / 2
  );

  readonly totalPairs = computed(() => this.cards().length / 2);

  readonly isGameWon = computed(() =>
    this.cards().length > 0 && this.cards().every(c => c.matched)
  );

  startNewGame(items: string[], hintCount: number): void {
    const pairs = items.flatMap((content, i) => [
      { id: i * 2, content, pairId: i, flipped: false, matched: false },
      { id: i * 2 + 1, content, pairId: i, flipped: false, matched: false },
    ]);
    this.cards.set(this.shuffle(pairs));
    this.moves.set(0);
    this.firstPick.set(null);
    this.secondPick.set(null);
    this.locked.set(false);
    this.hints.set(hintCount);
    this.hintActive.set(false);
  }

  useHint(): void {
    if (this.hints() <= 0 || this.locked() || this.hintActive()) return;

    this.hints.update(h => h - 1);
    this.hintActive.set(true);
    this.locked.set(true);

    this.cards.update(cards =>
      cards.map(c => (c.matched ? c : { ...c, flipped: true }))
    );

    setTimeout(() => {
      this.cards.update(cards =>
        cards.map(c => (c.matched ? c : { ...c, flipped: false }))
      );
      this.firstPick.set(null);
      this.secondPick.set(null);
      this.locked.set(false);
      this.hintActive.set(false);
    }, 1000);
  }

  flipCard(card: Card): void {
    if (this.locked() || card.flipped || card.matched) return;
    if (this.firstPick()?.id === card.id) return;

    this.updateCard(card.id, { flipped: true });

    if (!this.firstPick()) {
      this.firstPick.set(card);
      return;
    }

    this.secondPick.set(card);
    this.moves.update(m => m + 1);
    this.locked.set(true);

    const first = this.firstPick()!;
    if (first.pairId === card.pairId) {
      setTimeout(() => {
        this.updateCard(first.id, { matched: true });
        this.updateCard(card.id, { matched: true });
        this.resetPicks();
      }, 600);
    } else {
      setTimeout(() => {
        this.updateCard(first.id, { flipped: false });
        this.updateCard(card.id, { flipped: false });
        this.resetPicks();
      }, 1000);
    }
  }

  private resetPicks(): void {
    this.firstPick.set(null);
    this.secondPick.set(null);
    this.locked.set(false);
  }

  private updateCard(id: number, changes: Partial<Card>): void {
    this.cards.update(cards =>
      cards.map(c => (c.id === id ? { ...c, ...changes } : c))
    );
  }

  private shuffle<T>(array: T[]): T[] {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
