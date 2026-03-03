import { useState, useCallback } from 'react';
import { GameState, WinningLine, Toast as ToastType } from '../types';
import { generateCard } from '../lib/cardGenerator';
import { countFilled } from '../lib/bingoChecker';
import { useGame } from '../hooks/useGame';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useBingoDetection } from '../hooks/useBingoDetection';
import { BingoCard } from './BingoCard';
import { TranscriptPanel } from './TranscriptPanel';
import { GameControls } from './GameControls';
import { Toast } from './ui/Toast';

interface Props {
  game: GameState;
  setGame: React.Dispatch<React.SetStateAction<GameState>>;
  onWin: (winningLine: WinningLine, winningWord: string) => void;
}

export function GameBoard({ game, setGame, onWin }: Props) {
  const [detectedWords, setDetectedWords] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const { toggleSquare, handleTranscript } = useGame(setGame);

  const speech = useSpeechRecognition();

  const onTranscriptResult = useCallback(
    (transcript: string) => {
      handleTranscript(transcript);

      // Track detected words for display
      setGame(prev => {
        if (!prev.card) return prev;
        const autoFilled = prev.card.squares
          .flat()
          .filter(sq => sq.isAutoFilled)
          .map(sq => sq.word);
        setDetectedWords(autoFilled);
        return prev;
      });
    },
    [handleTranscript, setGame],
  );

  const handleToggleListening = useCallback(() => {
    if (speech.isListening) {
      speech.stopListening();
    } else {
      speech.startListening(onTranscriptResult);
    }
  }, [speech, onTranscriptResult]);

  const handleNewCard = useCallback(() => {
    if (!game.category) return;
    speech.stopListening();
    speech.resetTranscript();
    setDetectedWords([]);
    const card = generateCard(game.category);
    setGame(prev => ({
      ...prev,
      card,
      filledCount: countFilled(card),
      winningLine: null,
      winningWord: null,
      status: 'playing',
      startedAt: Date.now(),
    }));
  }, [game.category, speech, setGame]);

  const handleBingo = useCallback(
    (winningLine: WinningLine, lastWord: string) => {
      speech.stopListening();
      onWin(winningLine, lastWord);
    },
    [speech, onWin],
  );

  useBingoDetection(game.card, handleBingo);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  if (!game.card) return null;

  return (
    <div className="min-h-screen px-4 py-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-900">Meeting Bingo</h1>
        <div className="text-sm text-gray-500">
          {game.filledCount - 1}/24 filled
        </div>
      </div>

      {/* Bingo Card */}
      <BingoCard
        card={game.card}
        winningLine={game.winningLine}
        onSquareClick={toggleSquare}
      />

      {/* Transcript */}
      <TranscriptPanel
        transcript={speech.transcript}
        interimTranscript={speech.interimTranscript}
        detectedWords={detectedWords}
        isListening={speech.isListening}
      />

      {/* Controls */}
      <GameControls
        isListening={speech.isListening}
        isSupported={speech.isSupported}
        onToggleListening={handleToggleListening}
        onNewCard={handleNewCard}
      />

      {/* Toasts */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </div>
    </div>
  );
}
