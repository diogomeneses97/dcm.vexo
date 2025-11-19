"use client";

import { OnboardingData } from '@/lib/types';
import { FITNESS_LEVELS } from '@/lib/constants';

interface LevelStepProps {
  data: Partial<OnboardingData>;
  updateData: (updates: Partial<OnboardingData>) => void;
}

export default function LevelStep({ data, updateData }: LevelStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold gradient-vexo-text">
          Your Fitness Level
        </h1>
        <p className="text-gray-400 text-lg">
          Be honest - we'll tailor everything to you
        </p>
      </div>

      <div className="space-y-4">
        {FITNESS_LEVELS.map((level) => (
          <button
            key={level.value}
            onClick={() => updateData({ level: level.value })}
            className={`
              w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left
              ${data.level === level.value
                ? 'border-[#00D9FF] bg-[#00D9FF]/10 scale-105'
                : 'border-gray-800 hover:border-gray-700 hover:bg-gray-900/50'
              }
            `}
          >
            <h3 className="text-2xl font-bold mb-2">{level.label}</h3>
            <p className="text-gray-400">{level.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
