// DCM VEXO - Type Definitions

export type Goal = 'lose_weight' | 'build_muscle' | 'performance' | 'general_fitness';
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
export type Equipment = 'none' | 'basic' | 'full_gym';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very_active' | 'athlete';

export interface OnboardingData {
  goal: Goal;
  level: FitnessLevel;
  daysPerWeek: number;
  equipment: Equipment;
  age: number;
  height: number; // cm
  weight: number; // kg
  activityLevel: ActivityLevel;
}

export interface UserProfile extends OnboardingData {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  isPremium: boolean;
}

export interface WorkoutProgram {
  id: string;
  name: string;
  description: string;
  duration: number; // weeks
  daysPerWeek: number;
  level: FitnessLevel;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'mobility';
  equipment: Equipment;
  sets?: number;
  reps?: string;
  duration?: number; // seconds
  restTime?: number; // seconds
  videoUrl?: string;
  thumbnailUrl?: string;
}

export interface NutritionPlan {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fats: number; // grams
  meals: Meal[];
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients?: string[];
  imageUrl?: string;
}

export interface FoodScan {
  id: string;
  imageUrl: string;
  detectedFood: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  timestamp: Date;
}

export interface ProgressEntry {
  id: string;
  date: Date;
  weight?: number;
  bodyFat?: number;
  photos?: string[];
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    legs?: number;
  };
  notes?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'workout' | 'nutrition' | 'mindset';
  startDate: Date;
  endDate: Date;
  participants: number;
  reward?: string;
}

export interface Subscription {
  tier: 'free' | 'premium';
  price?: number;
  features: string[];
  limits?: {
    workoutsPerWeek?: number;
    scansPerDay?: number;
    communityAccess?: boolean;
  };
}
