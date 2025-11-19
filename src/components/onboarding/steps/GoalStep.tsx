"use client";

import { OnboardingData } from '@/lib/types';
import { GOALS } from '@/lib/constants';
import { motion } from 'framer-motion';

interface GoalStepProps {
  data: Partial<OnboardingData>;
  updateData: (updates: Partial<OnboardingData>) => void;
}

export default function GoalStep({ data, updateData }: GoalStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold gradient-vexo-text">
          What's Your Goal?
        </h1>
        <p className="text-gray-400 text-lg">
          Choose your primary fitness objective
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {GOALS.map((goal) => (
          <button
            key={goal.value}
            onClick={() => updateData({ goal: goal.value })}
            className={`
              p-6 rounded-2xl border-2 transition-all duration-300
              ${data.goal === goal.value
                ? 'border-[#00D9FF] bg-[#00D9FF]/10 scale-105'
                : 'border-gray-800 hover:border-gray-700 hover:bg-gray-900/50'
              }
            `}
          >
            <div className="text-5xl mb-4">{goal.icon}</div>
            <h3 className="text-xl font-bold mb-2">{goal.label}</h3>
            <p className="text-sm text-gray-400">{goal.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
