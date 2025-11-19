'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dumbbell, Apple, Camera, Flame, TrendingUp, Zap, ArrowRight, Target, Award, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { t } = useLanguage();

  const todayWorkout = {
    name: 'Upper Body Power',
    exercises: 8,
    duration: 45,
    completed: false,
  };

  const nutrition = {
    calories: { current: 1450, target: 2200 },
    protein: { current: 85, target: 165 },
    carbs: { current: 120, target: 220 },
    fats: { current: 45, target: 73 },
  };

  const streak = 12;

  const quote = {
    text: "The only bad workout is the one that didn't happen.",
    author: "Unknown",
  };

  // Progress data
  const progressData = {
    weeklyWorkouts: { completed: 4, target: 5 },
    weight: { current: 75.2, change: -1.8, trend: 'down' },
    bodyFat: { current: 18.5, change: -2.1, trend: 'down' },
    achievements: [
      { name: '7-Day Streak', icon: Flame, color: 'text-orange-500' },
      { name: 'Nutrition Goal', icon: Apple, color: 'text-green-500' },
      { name: 'PR Achieved', icon: Award, color: 'text-yellow-500' },
    ]
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            {t('home.welcome')}
          </h1>
          <p className="text-gray-400 text-lg">
            {t('home.subtitle')}
          </p>
        </div>

        {/* Streak Card */}
        <Card className="mb-6 p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Flame className="w-8 h-8 text-orange-500" />
              <div>
                <div className="text-3xl font-bold text-orange-500">{streak}</div>
                <div className="text-sm text-gray-400">{t('home.streak')}</div>
              </div>
            </div>
            <Zap className="w-12 h-12 text-orange-500/20" />
          </div>
        </Card>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Today's Workout */}
          <Card className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-cyan-500/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold mb-1">{t('home.todayWorkout')}</h2>
                <p className="text-gray-400 text-sm">{todayWorkout.name}</p>
              </div>
              <Dumbbell className="w-8 h-8 text-cyan-400" />
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{t('training.exercises')}</span>
                <span className="font-semibold">{todayWorkout.exercises}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Duration</span>
                <span className="font-semibold">{todayWorkout.duration} min</span>
              </div>
            </div>

            <Link href="/training">
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                {t('training.startWorkout')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card>

          {/* Nutrition Overview */}
          <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold mb-1">{t('home.nutrition')}</h2>
                <p className="text-gray-400 text-sm">{t('nutrition.dailyGoals')}</p>
              </div>
              <Apple className="w-8 h-8 text-green-400" />
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{t('nutrition.calories')}</span>
                  <span className="font-semibold">{nutrition.calories.current} / {nutrition.calories.target}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                    style={{ width: `${(nutrition.calories.current / nutrition.calories.target) * 100}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-gray-400">{t('nutrition.protein')}</div>
                  <div className="font-semibold">{nutrition.protein.current}g</div>
                </div>
                <div>
                  <div className="text-gray-400">{t('nutrition.carbs')}</div>
                  <div className="font-semibold">{nutrition.carbs.current}g</div>
                </div>
                <div>
                  <div className="text-gray-400">{t('nutrition.fats')}</div>
                  <div className="font-semibold">{nutrition.fats.current}g</div>
                </div>
              </div>
            </div>

            <Link href="/nutrition">
              <Button variant="outline" className="w-full border-green-500/30 hover:bg-green-500/10">
                {t('home.logMeal')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card>
        </div>

        {/* Progress Tracking Section */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Progress Tracking</h2>
            <TrendingUp className="w-6 h-6 text-purple-400" />
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {/* Weekly Workouts */}
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-400">This Week</span>
              </div>
              <div className="text-2xl font-bold">{progressData.weeklyWorkouts.completed}/{progressData.weeklyWorkouts.target}</div>
              <div className="text-xs text-gray-400">Workouts Completed</div>
            </div>

            {/* Weight */}
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-400">Weight</span>
              </div>
              <div className="text-2xl font-bold">{progressData.weight.current} kg</div>
              <div className="text-xs text-green-400">{progressData.weight.change} kg this month</div>
            </div>

            {/* Body Fat */}
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-gray-400">Body Fat</span>
              </div>
              <div className="text-2xl font-bold">{progressData.bodyFat.current}%</div>
              <div className="text-xs text-green-400">{progressData.bodyFat.change}% this month</div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Recent Achievements</h3>
            <div className="flex gap-3">
              {progressData.achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                    <Icon className={`w-4 h-4 ${achievement.color}`} />
                    <span className="text-xs font-medium">{achievement.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Link href="/scanner">
            <Card className="p-4 hover:bg-white/5 transition-all cursor-pointer border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              <Camera className="w-8 h-8 text-purple-400 mb-2" />
              <div className="font-semibold text-sm">{t('home.scanFood')}</div>
            </Card>
          </Link>

          <Link href="/training">
            <Card className="p-4 hover:bg-white/5 transition-all cursor-pointer border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
              <Dumbbell className="w-8 h-8 text-cyan-400 mb-2" />
              <div className="font-semibold text-sm">{t('home.viewProgram')}</div>
            </Card>
          </Link>

          <Link href="/goals-quiz">
            <Card className="p-4 hover:bg-white/5 transition-all cursor-pointer border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-red-500/10">
              <Target className="w-8 h-8 text-orange-400 mb-2" />
              <div className="font-semibold text-sm">Set Goals</div>
            </Card>
          </Link>

          <Link href="/community">
            <Card className="p-4 hover:bg-white/5 transition-all cursor-pointer border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
              <Zap className="w-8 h-8 text-blue-400 mb-2" />
              <div className="font-semibold text-sm">Challenges</div>
            </Card>
          </Link>
        </div>

        {/* Daily Quote */}
        <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <h3 className="text-sm font-semibold text-purple-400 mb-2">{t('home.quote')}</h3>
          <p className="text-lg italic mb-2">&quot;{quote.text}&quot;</p>
          <p className="text-sm text-gray-400">— {quote.author}</p>
        </Card>
      </div>
    </div>
  );
}
