import { Component } from '@angular/core';
import { MagicMemoryComponent, MemoryGameConfig } from 'ngx-magic-memory';

@Component({
  selector: 'app-root',
  imports: [MagicMemoryComponent],
  template: `<magic-memory [config]="gameConfig" />`,
})
export class App {
  gameConfig: MemoryGameConfig = {
    items: ['🦊', '🐸', '🦉', '🐙', '🦋', '🐺', '🦄', '🐲'],
    cardBack: '?',
    hints: 5,
    title: 'Magic Memory',
  };
}
