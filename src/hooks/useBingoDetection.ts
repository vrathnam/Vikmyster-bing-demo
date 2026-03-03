import { useEffect, useRef } from 'react';
import { BingoCard, WinningLine } from '../types';
import { checkForBingo } from '../lib/bingoChecker';

export function useBingoDetection(
  card: BingoCard | null,
  onBingo: (winningLine: WinningLine, lastWord: string) => void
) {
  const prevFilledRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!card) return;

    const currentFilled = new Set(
      card.squares.flat().filter(sq => sq.isFilled).map(sq => sq.id)
    );

    // Find newly filled squares
    let lastFilledWord = '';
    for (const id of currentFilled) {
      if (!prevFilledRef.current.has(id)) {
        const [row, col] = id.split('-').map(Number);
        lastFilledWord = card.squares[row][col].word;
      }
    }

    prevFilledRef.current = currentFilled;

    const winningLine = checkForBingo(card);
    if (winningLine) {
      onBingo(winningLine, lastFilledWord);
    }
  }, [card, onBingo]);
}
