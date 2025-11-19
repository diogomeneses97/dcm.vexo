"use client";

import { useState, useEffect } from 'react';
import { OnboardingData } from '@/lib/types';

const STORAGE_KEY = 'dcm_vexo_onboarding';

export function useOnboarding() {
  const [data, setData] = useState<Partial<OnboardingData>>({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed);
        setIsComplete(isOnboardingComplete(parsed));
      } catch (e) {
        console.error('Failed to parse onboarding data:', e);
      }
    }
  }, []);

  const updateData = (updates: Partial<OnboardingData>) => {
    const newData = { ...data, ...updates };
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    setIsComplete(isOnboardingComplete(newData));
  };

  const resetOnboarding = () => {
    setData({});
    setIsComplete(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    data,
    updateData,
    resetOnboarding,
    isComplete
  };
}

function isOnboardingComplete(data: Partial<OnboardingData>): boolean {
  return !!(
    data.goal &&
    data.level &&
    data.daysPerWeek &&
    data.equipment &&
    data.age &&
    data.height &&
    data.weight &&
    data.activityLevel
  );
}
