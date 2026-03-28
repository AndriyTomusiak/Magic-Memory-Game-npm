import { Component, input } from '@angular/core';
import { MagicMemoryComponent, MemoryGameConfig } from 'ngx-magic-memory';

@Component({
  selector: 'app-root',
  imports: [MagicMemoryComponent],
  template: `<magic-memory [config]="gameConfig()" />`,
})
export class App {
  gameConfig = input<MemoryGameConfig>({
    items: ['🦊', '🐸', '🦉', '🐙', '🦋', '🐺', '🦄', '🐲'],
    cardBack: '?',
    hints: 5,
    title: 'Magic Memory',
  });
}
