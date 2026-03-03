import { useCallback } from 'react';
import { BingoCard } from '../types';
import { countFilled } from '../lib/bingoChecker';
import { detectWordsWithAliases } from '../lib/wordDetector';

export function useGame(
  setGame: React.Dispatch<React.SetStateAction<import('../types').GameState>>
) {
  const toggleSquare = useCallback((row: number, col: number) => {
    setGame(prev => {
      if (!prev.card || prev.status !== 'playing') return prev;

      const square = prev.card.squares[row][col];
      if (square.isFreeSpace) return prev;

      const newSquares = prev.card.squares.map((r, ri) =>
        r.map((s, ci) => {
          if (ri === row && ci === col) {
            return {
              ...s,
              isFilled: !s.isFilled,
              isAutoFilled: false,
              filledAt: !s.isFilled ? Date.now() : null,
            };
          }
          return s;
        })
      );

      const newCard: BingoCard = { ...prev.card, squares: newSquares };

      return {
        ...prev,
        card: newCard,
        filledCount: countFilled(newCard),
      };
    });
  }, [setGame]);

  const handleTranscript = useCallback((transcript: string) => {
    setGame(prev => {
      if (!prev.card || prev.status !== 'playing') return prev;

      const alreadyFilled = new Set(
        prev.card.squares
          .flat()
          .filter(sq => sq.isFilled)
          .map(sq => sq.word.toLowerCase())
      );

      const detected = detectWordsWithAliases(
        transcript,
        prev.card.words,
        alreadyFilled
      );

      if (detected.length === 0) return prev;

      const detectedLower = new Set(detected.map(w => w.toLowerCase()));

      const newSquares = prev.card.squares.map(row =>
        row.map(sq => {
          if (sq.isFilled || sq.isFreeSpace) return sq;
          if (detectedLower.has(sq.word.toLowerCase())) {
            return {
              ...sq,
              isFilled: true,
              isAutoFilled: true,
              filledAt: Date.now(),
            };
          }
          return sq;
        })
      );

      const newCard: BingoCard = { ...prev.card, squares: newSquares };

      return {
        ...prev,
        card: newCard,
        filledCount: countFilled(newCard),
      };
    });
  }, [setGame]);

  return { toggleSquare, handleTranscript };
}
