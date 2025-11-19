"use client";

import { OnboardingData } from '@/lib/types';
import { ACTIVITY_LEVELS } from '@/lib/constants';

interface ActivityStepProps {
  data: Partial<OnboardingData>;
  updateData: (updates: Partial<OnboardingData>) => void;
}

export default function ActivityStep({ data, updateData }: ActivityStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold gradient-vexo-text">
          Activity Level
        </h1>
        <p className="text-gray-400 text-lg">
          Outside of your planned workouts
        </p>
      </div>

      <div className="space-y-3">
        {ACTIVITY_LEVELS.map((activity) => (
          <button
            key={activity.value}
            onClick={() => updateData({ activityLevel: activity.value })}
            className={`
              w-full p-5 rounded-xl border-2 transition-all duration-300 text-left
              ${data.activityLevel === activity.value
                ? 'border-[#00D9FF] bg-[#00D9FF]/10 scale-105'
                : 'border-gray-800 hover:border-gray-700 hover:bg-gray-900/50'
              }
            `}
          >
            <h3 className="text-lg font-bold mb-1">{activity.label}</h3>
            <p className="text-sm text-gray-400">{activity.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
