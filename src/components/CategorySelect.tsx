import { CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface Props {
  onSelect: (categoryId: CategoryId) => void;
  onBack: () => void;
}

export function CategorySelect({ onSelect, onBack }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Choose Your Buzzword Pack
      </h2>
      <p className="text-gray-500 mb-10">
        Pick the category that matches your meeting
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full">
        {CATEGORIES.map(category => (
          <Card
            key={category.id}
            onClick={() => onSelect(category.id)}
            className="text-center hover:scale-105 transition-transform"
          >
            <div className="text-4xl mb-3">{category.icon}</div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {category.name}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {category.description}
            </p>
            <div className="flex flex-wrap gap-1 justify-center mb-4">
              {category.words.slice(0, 4).map(word => (
                <span
                  key={word}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                >
                  {word}
                </span>
              ))}
            </div>
            <Button size="sm" className="w-full">
              Select
            </Button>
          </Card>
        ))}
      </div>

      <button
        onClick={onBack}
        className="mt-8 text-gray-500 hover:text-gray-700 text-sm"
      >
        &larr; Back to Home
      </button>
    </div>
  );
}
