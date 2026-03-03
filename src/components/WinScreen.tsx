import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GameState } from '../types';
import { CATEGORIES } from '../data/categories';
import { generateShareText, copyToClipboard, nativeShare } from '../lib/shareUtils';
import { BingoCard } from './BingoCard';
import { Button } from './ui/Button';

interface Props {
  game: GameState;
  onPlayAgain: () => void;
  onHome: () => void;
}

export function WinScreen({ game, onPlayAgain, onHome }: Props) {
  useEffect(() => {
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  const category = CATEGORIES.find(c => c.id === game.category);
  const elapsed =
    game.startedAt && game.completedAt
      ? Math.round((game.completedAt - game.startedAt) / 60000)
      : 0;

  const handleShare = async () => {
    const text = generateShareText(game);
    const shared = await nativeShare(text);
    if (!shared) {
      await copyToClipboard(text);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-5xl font-bold text-green-600 mb-6 animate-bounce-in">
        BINGO!
      </h1>

      {game.card && (
        <div className="w-full max-w-md mb-8">
          <BingoCard
            card={game.card}
            winningLine={game.winningLine}
            onSquareClick={() => {}}
          />
        </div>
      )}

      <div className="text-center space-y-2 mb-8">
        <p className="text-gray-600">
          <span className="font-medium">Category:</span> {category?.name}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Time to BINGO:</span> {elapsed} minutes
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Winning word:</span>{' '}
          &ldquo;{game.winningWord}&rdquo;
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Squares filled:</span>{' '}
          {game.filledCount - 1}/24
        </p>
      </div>

      <div className="flex gap-4">
        <Button onClick={handleShare} variant="secondary">
          Share Result
        </Button>
        <Button onClick={onPlayAgain}>Play Again</Button>
      </div>

      <button
        onClick={onHome}
        className="mt-6 text-sm text-gray-400 hover:text-gray-600"
      >
        Back to Home
      </button>
    </div>
  );
}
