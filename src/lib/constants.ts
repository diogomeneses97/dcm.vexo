// DCM VEXO - Constants & Configuration

import { Goal, FitnessLevel, Equipment, ActivityLevel } from './types';

export const GOALS: { value: Goal; label: string; description: string; icon: string }[] = [
  {
    value: 'lose_weight',
    label: 'Lose Weight',
    description: 'Burn fat and get lean',
    icon: '🔥'
  },
  {
    value: 'build_muscle',
    label: 'Build Muscle',
    description: 'Gain strength and size',
    icon: '💪'
  },
  {
    value: 'performance',
    label: 'Performance',
    description: 'Optimize athletic ability',
    icon: '⚡'
  },
  {
    value: 'general_fitness',
    label: 'General Fitness',
    description: 'Stay healthy and active',
    icon: '🎯'
  }
];

export const FITNESS_LEVELS: { value: FitnessLevel; label: string; description: string }[] = [
  {
    value: 'beginner',
    label: 'Beginner',
    description: 'New to training or returning after a break'
  },
  {
    value: 'intermediate',
    label: 'Intermediate',
    description: '6+ months of consistent training'
  },
  {
    value: 'advanced',
    label: 'Advanced',
    description: '2+ years of structured training'
  }
];

export const EQUIPMENT_OPTIONS: { value: Equipment; label: string; description: string }[] = [
  {
    value: 'none',
    label: 'No Equipment',
    description: 'Bodyweight only'
  },
  {
    value: 'basic',
    label: 'Basic Equipment',
    description: 'Dumbbells, resistance bands'
  },
  {
    value: 'full_gym',
    label: 'Full Gym',
    description: 'Complete gym access'
  }
];

export const ACTIVITY_LEVELS: { value: ActivityLevel; label: string; description: string }[] = [
  {
    value: 'sedentary',
    label: 'Sedentary',
    description: 'Little to no exercise'
  },
  {
    value: 'light',
    label: 'Lightly Active',
    description: 'Light exercise 1-3 days/week'
  },
  {
    value: 'moderate',
    label: 'Moderately Active',
    description: 'Moderate exercise 3-5 days/week'
  },
  {
    value: 'very_active',
    label: 'Very Active',
    description: 'Hard exercise 6-7 days/week'
  },
  {
    value: 'athlete',
    label: 'Athlete',
    description: 'Professional training'
  }
];

export const DAYS_PER_WEEK = [3, 4, 5, 6, 7];

export const MOTIVATIONAL_QUOTES = [
  "Your body can stand almost anything. It's your mind you have to convince.",
  "The only bad workout is the one that didn't happen.",
  "Success is the sum of small efforts repeated day in and day out.",
  "Don't wish for it. Work for it.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Your only limit is you.",
  "Push yourself because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Believe it. Build it.",
  "Strive for progress, not perfection."
];

export const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    features: [
      'Limited workout programs',
      '3 food scans per day',
      'Basic nutrition tracking',
      'Limited community access'
    ],
    limits: {
      workoutsPerWeek: 3,
      scansPerDay: 3,
      communityAccess: false
    }
  },
  premium: {
    name: 'Premium',
    price: 14.99,
    features: [
      'Unlimited AI-generated workouts',
      'Unlimited food scanning',
      'Personalized nutrition plans',
      'Full community access',
      'Weekly challenges',
      'Progress analytics',
      'Sleep & meditation tools',
      'Priority support'
    ]
  }
};

export const CHECKOUT_FUNNEL = {
  lowTicket: {
    name: 'Starter Guide',
    price: 9.99,
    description: 'Complete beginner workout guide'
  },
  orderBump: {
    name: 'Nutrition Basics',
    price: 4.99,
    description: 'Essential nutrition guide'
  },
  upsell: {
    name: 'Premium Monthly',
    price: 14.99,
    firstMonthPrice: 7.49,
    description: 'Full access to all features'
  },
  downsell: {
    name: 'Training Only',
    price: 6.99,
    description: 'Workout programs only'
  },
  masterclass: {
    name: 'Performance Masterclass',
    price: 29.99,
    description: 'Advanced training strategies'
  }
};
