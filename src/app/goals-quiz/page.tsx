'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, ArrowRight, ArrowLeft, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string }[];
}

const questions: Question[] = [
  {
    id: 'goal',
    question: 'What is your primary fitness goal?',
    options: [
      { value: 'lose_weight', label: 'Lose Weight' },
      { value: 'build_muscle', label: 'Build Muscle' },
      { value: 'get_fit', label: 'Get Fit & Healthy' },
      { value: 'athletic', label: 'Improve Athletic Performance' },
    ],
  },
  {
    id: 'experience',
    question: 'What is your fitness experience level?',
    options: [
      { value: 'beginner', label: 'Beginner - Just starting out' },
      { value: 'intermediate', label: 'Intermediate - 6+ months experience' },
      { value: 'advanced', label: 'Advanced - 2+ years experience' },
      { value: 'expert', label: 'Expert - Competitive level' },
    ],
  },
  {
    id: 'frequency',
    question: 'How many days per week can you train?',
    options: [
      { value: '2-3', label: '2-3 days per week' },
      { value: '4-5', label: '4-5 days per week' },
      { value: '6-7', label: '6-7 days per week' },
    ],
  },
  {
    id: 'diet',
    question: 'What is your current diet approach?',
    options: [
      { value: 'flexible', label: 'Flexible - I eat everything' },
      { value: 'vegetarian', label: 'Vegetarian' },
      { value: 'vegan', label: 'Vegan' },
      { value: 'keto', label: 'Keto/Low Carb' },
      { value: 'other', label: 'Other dietary preference' },
    ],
  },
  {
    id: 'focus',
    question: 'What do you want to focus on most?',
    options: [
      { value: 'strength', label: 'Strength Training' },
      { value: 'cardio', label: 'Cardio & Endurance' },
      { value: 'flexibility', label: 'Flexibility & Mobility' },
      { value: 'balanced', label: 'Balanced Approach' },
    ],
  },
];

export default function GoalsQuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = async () => {
    // Save answers to localStorage or send to API
    localStorage.setItem('userGoals', JSON.stringify(answers));
    setIsComplete(true);

    // Redirect to home after 2 seconds
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen pt-20 pb-24 md:pb-8 px-4 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20">
          <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-gray-400 mb-4">
            Your personalized fitness plan is ready. Redirecting...
          </p>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 animate-pulse" style={{ width: '100%' }} />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Target className="w-8 h-8 text-orange-400" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
              Set Your Goals
            </h1>
          </div>
          <p className="text-gray-400">
            Answer a few questions to personalize your experience
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-6 md:p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            {currentQuestion.question}
          </h2>

          <RadioGroup
            value={answers[currentQuestion.id]}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div
                key={option.value}
                className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer ${
                  answers[currentQuestion.id] === option.value
                    ? 'bg-purple-500/20 border-purple-500'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label
                  htmlFor={option.value}
                  className="flex-1 cursor-pointer text-sm md:text-base"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            <Button
              onClick={handleBack}
              disabled={currentStep === 0}
              variant="outline"
              className="flex-1 border-purple-500/30 hover:bg-purple-500/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            >
              {currentStep === questions.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>

        {/* Skip Option */}
        <div className="text-center mt-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-gray-400 hover:text-white"
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
}
