'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Apple, Plus, TrendingUp, Flame, Droplet } from 'lucide-react';

const nutritionData = {
  dailyGoals: {
    calories: 2200,
    protein: 165,
    carbs: 220,
    fats: 73,
  },
  current: {
    calories: 1450,
    protein: 85,
    carbs: 120,
    fats: 45,
  },
  meals: [
    {
      id: 1,
      type: 'breakfast',
      name: 'Protein Oatmeal Bowl',
      time: '08:00',
      calories: 450,
      protein: 35,
      carbs: 55,
      fats: 12,
      foods: ['Oats', 'Whey Protein', 'Banana', 'Almond Butter'],
    },
    {
      id: 2,
      type: 'snack',
      name: 'Greek Yogurt & Berries',
      time: '11:00',
      calories: 200,
      protein: 20,
      carbs: 25,
      fats: 5,
      foods: ['Greek Yogurt', 'Mixed Berries', 'Honey'],
    },
    {
      id: 3,
      type: 'lunch',
      name: 'Chicken & Rice Bowl',
      time: '13:30',
      calories: 600,
      protein: 45,
      carbs: 65,
      fats: 15,
      foods: ['Chicken Breast', 'Brown Rice', 'Broccoli', 'Olive Oil'],
    },
    {
      id: 4,
      type: 'snack',
      name: 'Protein Shake',
      time: '16:00',
      calories: 200,
      protein: 30,
      carbs: 10,
      fats: 5,
      foods: ['Whey Protein', 'Almond Milk', 'Banana'],
    },
  ],
  mealSuggestions: [
    {
      name: 'Grilled Salmon & Quinoa',
      calories: 550,
      protein: 42,
      carbs: 48,
      fats: 18,
    },
    {
      name: 'Turkey Wrap',
      calories: 420,
      protein: 35,
      carbs: 40,
      fats: 12,
    },
    {
      name: 'Beef Stir Fry',
      calories: 480,
      protein: 38,
      carbs: 45,
      fats: 15,
    },
  ],
};

export default function NutritionPage() {
  const { t } = useLanguage();
  const [selectedMeal, setSelectedMeal] = useState(nutritionData.meals[0]);

  const getMacroPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'breakfast':
        return '🌅';
      case 'lunch':
        return '☀️';
      case 'dinner':
        return '🌙';
      case 'snack':
        return '🍎';
      default:
        return '🍽️';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            {t('nutrition.title')}
          </h1>
          <p className="text-gray-400">{t('nutrition.dailyGoals')}</p>
        </div>

        {/* Daily Overview */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-600/10 border-green-500/20">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Calories */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">{t('nutrition.calories')}</span>
                <Flame className="w-4 h-4 text-orange-500" />
              </div>
              <div className="text-2xl font-bold mb-1">
                {nutritionData.current.calories}
                <span className="text-sm text-gray-400 font-normal">
                  /{nutritionData.dailyGoals.calories}
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                  style={{
                    width: `${getMacroPercentage(
                      nutritionData.current.calories,
                      nutritionData.dailyGoals.calories
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Protein */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">{t('nutrition.protein')}</span>
                <TrendingUp className="w-4 h-4 text-cyan-500" />
              </div>
              <div className="text-2xl font-bold mb-1">
                {nutritionData.current.protein}g
                <span className="text-sm text-gray-400 font-normal">
                  /{nutritionData.dailyGoals.protein}g
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  style={{
                    width: `${getMacroPercentage(
                      nutritionData.current.protein,
                      nutritionData.dailyGoals.protein
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Carbs */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">{t('nutrition.carbs')}</span>
                <Apple className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold mb-1">
                {nutritionData.current.carbs}g
                <span className="text-sm text-gray-400 font-normal">
                  /{nutritionData.dailyGoals.carbs}g
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{
                    width: `${getMacroPercentage(
                      nutritionData.current.carbs,
                      nutritionData.dailyGoals.carbs
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Fats */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">{t('nutrition.fats')}</span>
                <Droplet className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold mb-1">
                {nutritionData.current.fats}g
                <span className="text-sm text-gray-400 font-normal">
                  /{nutritionData.dailyGoals.fats}g
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                  style={{
                    width: `${getMacroPercentage(
                      nutritionData.current.fats,
                      nutritionData.dailyGoals.fats
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Meals List */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">{t('nutrition.meals')}</h2>
                <Button size="sm" variant="ghost">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {nutritionData.meals.map((meal) => (
                  <button
                    key={meal.id}
                    onClick={() => setSelectedMeal(meal)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedMeal.id === meal.id
                        ? 'bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{getMealIcon(meal.type)}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{meal.name}</div>
                        <div className="text-xs text-gray-400">{meal.time}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {meal.calories} cal • {meal.protein}g protein
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Meal Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getMealIcon(selectedMeal.type)}</span>
                    <h2 className="text-2xl font-bold">{selectedMeal.name}</h2>
                  </div>
                  <Badge variant="outline" className="border-green-500/30 text-green-400">
                    {selectedMeal.time}
                  </Badge>
                </div>
              </div>

              {/* Macros Grid */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 rounded-lg bg-orange-500/10">
                  <div className="text-2xl font-bold text-orange-500">
                    {selectedMeal.calories}
                  </div>
                  <div className="text-xs text-gray-400">Calories</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-cyan-500/10">
                  <div className="text-2xl font-bold text-cyan-500">
                    {selectedMeal.protein}g
                  </div>
                  <div className="text-xs text-gray-400">Protein</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-green-500/10">
                  <div className="text-2xl font-bold text-green-500">
                    {selectedMeal.carbs}g
                  </div>
                  <div className="text-xs text-gray-400">Carbs</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-yellow-500/10">
                  <div className="text-2xl font-bold text-yellow-500">
                    {selectedMeal.fats}g
                  </div>
                  <div className="text-xs text-gray-400">Fats</div>
                </div>
              </div>

              {/* Foods */}
              <div>
                <h3 className="font-semibold mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMeal.foods.map((food, index) => (
                    <Badge key={index} variant="secondary">
                      {food}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Meal Suggestions */}
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">Suggested Meals</h2>
              <div className="space-y-3">
                {nutritionData.mealSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{suggestion.name}</h3>
                      <Button size="sm" variant="ghost">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>{suggestion.calories} cal</span>
                      <span>•</span>
                      <span>{suggestion.protein}g protein</span>
                      <span>•</span>
                      <span>{suggestion.carbs}g carbs</span>
                      <span>•</span>
                      <span>{suggestion.fats}g fats</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
