import { GameState } from '../types';
import { CATEGORIES } from '../data/categories';

export function generateShareText(game: GameState): string {
  const category = CATEGORIES.find(c => c.id === game.category);
  const categoryName = category?.name ?? 'Unknown';

  const elapsed = game.startedAt && game.completedAt
    ? Math.round((game.completedAt - game.startedAt) / 60000)
    : 0;

  const lines = [
    'BINGO! I won Meeting Bingo!',
    '',
    `Category: ${categoryName}`,
    `Time to BINGO: ${elapsed} minutes`,
    `Winning word: "${game.winningWord}"`,
    `Squares filled: ${game.filledCount}/24`,
    '',
    'Play Meeting Bingo: meetingbingo.vercel.app',
  ];

  return lines.join('\n');
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export async function nativeShare(text: string): Promise<boolean> {
  if (!navigator.share) return false;

  try {
    await navigator.share({
      title: 'Meeting Bingo',
      text,
    });
    return true;
  } catch {
    return false;
  }
}
