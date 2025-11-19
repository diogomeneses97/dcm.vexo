"use client";

import { OnboardingData } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface StatsStepProps {
  data: Partial<OnboardingData>;
  updateData: (updates: Partial<OnboardingData>) => void;
}

export default function StatsStep({ data, updateData }: StatsStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold gradient-vexo-text">
          Your Stats
        </h1>
        <p className="text-gray-400 text-lg">
          Help us personalize your plan
        </p>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <Label htmlFor="age" className="text-base">Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="25"
            value={data.age || ''}
            onChange={(e) => updateData({ age: parseInt(e.target.value) || 0 })}
            className="h-14 text-lg bg-gray-900 border-gray-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height" className="text-base">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="175"
              value={data.height || ''}
              onChange={(e) => updateData({ height: parseInt(e.target.value) || 0 })}
              className="h-14 text-lg bg-gray-900 border-gray-800"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight" className="text-base">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="75"
              value={data.weight || ''}
              onChange={(e) => updateData({ weight: parseInt(e.target.value) || 0 })}
              className="h-14 text-lg bg-gray-900 border-gray-800"
            />
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          🔒 Your data is private and secure
        </div>
      </div>
    </div>
  );
}
