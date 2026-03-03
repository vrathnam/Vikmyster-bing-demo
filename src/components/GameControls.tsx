import { Button } from './ui/Button';

interface Props {
  isListening: boolean;
  isSupported: boolean;
  onToggleListening: () => void;
  onNewCard: () => void;
}

export function GameControls({
  isListening,
  isSupported,
  onToggleListening,
  onNewCard,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      <Button variant="secondary" size="sm" onClick={onNewCard}>
        New Card
      </Button>
      {isSupported && (
        <Button
          variant={isListening ? 'secondary' : 'primary'}
          size="sm"
          onClick={onToggleListening}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </Button>
      )}
    </div>
  );
}
