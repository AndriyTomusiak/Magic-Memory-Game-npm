export interface MemoryGameConfig {
  /** Array of items to match (emojis, image URLs, text). Pairs are auto-generated. */
  items: string[];
  /** What shows on the face-down side of cards. Defaults to '?' */
  cardBack?: string;
  /** Number of hints the player gets. Defaults to 3 */
  hints?: number;
  /** Title displayed above the game board. Defaults to 'Magic Memory' */
  title?: string;
}
