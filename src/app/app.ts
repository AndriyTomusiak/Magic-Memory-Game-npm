import { Component, input } from '@angular/core';
import { MagicMemoryComponent, MemoryGameConfig } from 'ngx-magic-memory';

@Component({
  selector: 'app-root',
  imports: [MagicMemoryComponent],
  template: `<magic-memory [config]="gameConfig()" />`,
})
export class App {
  gameConfig = input<MemoryGameConfig>({
    items: [
      'images/fox.png',
      'images/frog.png',
      'images/owl.png',
      'images/octopus.png',
      'images/butterfly.png',
      'images/wolf.png',
      'images/unicorn.png',
      'images/dragon.png',
    ],
    cardBack: 'images/card-back.png',
    hints: 5,
    title: 'Magic Memory',
  });
}
