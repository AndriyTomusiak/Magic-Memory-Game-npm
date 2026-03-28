# ngx-magic-memory

A configurable memory card matching game component for Angular 21+. Flip cards, find matching pairs, and use hints when you're stuck.

## Installation

```bash
npm install github:your-username/MagicMemoryGame
```

## Usage

Import the component and pass your configuration:

```typescript
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
```

## Configuration

The `MemoryGameConfig` interface accepts the following properties:

| Property   | Type       | Required | Default          | Description                                      |
|------------|------------|----------|------------------|--------------------------------------------------|
| `items`    | `string[]` | Yes      | -                | Array of items to match. Pairs are auto-generated |
| `cardBack` | `string`   | No       | `'?'`            | Content shown on the face-down side of cards      |
| `hints`    | `number`   | No       | `3`              | Number of hints the player gets per game          |
| `title`    | `string`   | No       | `'Magic Memory'` | Title displayed above the game board              |

## How It Works

1. Cards are shuffled and placed face-down on a 4-column grid
2. Click a card to flip it and reveal the content
3. Click a second card — if they match, both stay open; if not, they flip back
4. Use the **Hint** button to briefly reveal all remaining cards
5. Find all pairs to win the game

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build:lib

# Run the demo app
npm start
```

## License

MIT
