import { Button } from './ui/Button';

interface Props {
  onStart: () => void;
}

export function LandingPage({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center max-w-lg">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Meeting Bingo
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Turn any meeting into a game.
        </p>
        <p className="text-gray-500 mb-8">
          Auto-detects buzzwords using speech recognition!
        </p>

        <Button size="lg" onClick={onStart}>
          New Game
        </Button>

        <p className="mt-6 text-sm text-gray-400 flex items-center justify-center gap-1.5">
          <span>Audio processed locally. Never recorded.</span>
        </p>
      </div>

      <div className="mt-16 max-w-md w-full">
        <h2 className="text-lg font-semibold text-gray-700 mb-6 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            { step: '1', text: 'Pick a buzzword category' },
            { step: '2', text: 'Enable microphone for auto-detection' },
            { step: '3', text: 'Join your meeting and listen' },
            { step: '4', text: 'Watch squares fill automatically!' },
          ].map(({ step, text }) => (
            <div key={step} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm flex-shrink-0">
                {step}
              </div>
              <span className="text-gray-600">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
