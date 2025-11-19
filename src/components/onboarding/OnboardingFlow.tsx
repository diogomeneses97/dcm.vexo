"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/hooks/useOnboarding';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import GoalStep from './steps/GoalStep';
import LevelStep from './steps/LevelStep';
import DaysStep from './steps/DaysStep';
import EquipmentStep from './steps/EquipmentStep';
import StatsStep from './steps/StatsStep';
import ActivityStep from './steps/ActivityStep';
import SummaryStep from './steps/SummaryStep';
import GeneratingStep from './steps/GeneratingStep';

const TOTAL_STEPS = 8;

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const { data, updateData } = useOnboarding();
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Onboarding complete, redirect to dashboard
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!data.goal;
      case 2: return !!data.level;
      case 3: return !!data.daysPerWeek;
      case 4: return !!data.equipment;
      case 5: return !!(data.age && data.height && data.weight);
      case 6: return !!data.activityLevel;
      case 7: return true; // Summary step
      case 8: return true; // Generating step
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <GoalStep data={data} updateData={updateData} />;
      case 2: return <LevelStep data={data} updateData={updateData} />;
      case 3: return <DaysStep data={data} updateData={updateData} />;
      case 4: return <EquipmentStep data={data} updateData={updateData} />;
      case 5: return <StatsStep data={data} updateData={updateData} />;
      case 6: return <ActivityStep data={data} updateData={updateData} />;
      case 7: return <SummaryStep data={data} />;
      case 8: return <GeneratingStep onComplete={handleNext} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-900">
        <div 
          className="h-full gradient-vexo transition-all duration-300"
          style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-2xl">
          {/* Step Counter */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-400">
              Step {currentStep} of {TOTAL_STEPS}
            </p>
          </div>

          {/* Step Content */}
          <div className="mb-12">
            {renderStep()}
          </div>

          {/* Navigation */}
          {currentStep !== 8 && (
            <div className="flex gap-4">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 gradient-vexo hover:opacity-90 transition-opacity"
              >
                {currentStep === 7 ? 'Generate My Plan' : 'Continue'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
