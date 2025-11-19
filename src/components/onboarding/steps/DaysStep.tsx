"use client";

import { OnboardingData } from '@/lib/types';
import { DAYS_PER_WEEK } from '@/lib/constants';

interface DaysStepProps {
  data: Partial<OnboardingData>;
  updateData: (updates: Partial<OnboardingData>) => void;
}

export default function DaysStep({ data, updateData }: DaysStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold gradient-vexo-text">
          Training Frequency
        </h1>
        <p className="text-gray-400 text-lg">
          How many days per week can you commit?
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {DAYS_PER_WEEK.map((days) => (
          <button
            key={days}
            onClick={() => updateData({ daysPerWeek: days })}
            className={`
              aspect-square rounded-2xl border-2 transition-all duration-300
              flex flex-col items-center justify-center
              ${data.daysPerWeek === days
                ? 'border-[#00D9FF] bg-[#00D9FF]/10 scale-110'
                : 'border-gray-800 hover:border-gray-700 hover:bg-gray-900/50'
              }
            `}
          >
            <div className="text-4xl font-bold">{days}</div>
            <div className="text-xs text-gray-400 mt-1">
              {days === 1 ? 'day' : 'days'}
            </div>
          </button>
        ))}
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">
        💡 We recommend at least 3 days for optimal results
      </div>
    </div>
  );
}
