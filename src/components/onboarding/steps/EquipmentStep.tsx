"use client";

import { OnboardingData } from '@/lib/types';
import { EQUIPMENT_OPTIONS } from '@/lib/constants';
import { Dumbbell, Home, Building2 } from 'lucide-react';

interface EquipmentStepProps {
  data: Partial<OnboardingData>;
  updateData: (updates: Partial<OnboardingData>) => void;
}

const EQUIPMENT_ICONS = {
  none: Home,
  basic: Dumbbell,
  full_gym: Building2
};

export default function EquipmentStep({ data, updateData }: EquipmentStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold gradient-vexo-text">
          Available Equipment
        </h1>
        <p className="text-gray-400 text-lg">
          What equipment do you have access to?
        </p>
      </div>

      <div className="space-y-4">
        {EQUIPMENT_OPTIONS.map((equipment) => {
          const Icon = EQUIPMENT_ICONS[equipment.value];
          return (
            <button
              key={equipment.value}
              onClick={() => updateData({ equipment: equipment.value })}
              className={`
                w-full p-6 rounded-2xl border-2 transition-all duration-300
                flex items-center gap-4
                ${data.equipment === equipment.value
                  ? 'border-[#00D9FF] bg-[#00D9FF]/10 scale-105'
                  : 'border-gray-800 hover:border-gray-700 hover:bg-gray-900/50'
                }
              `}
            >
              <div className={`
                p-4 rounded-xl
                ${data.equipment === equipment.value ? 'bg-[#00D9FF]/20' : 'bg-gray-800'}
              `}>
                <Icon className="w-8 h-8" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-xl font-bold mb-1">{equipment.label}</h3>
                <p className="text-sm text-gray-400">{equipment.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
