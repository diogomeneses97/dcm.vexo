'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dumbbell, Play, CheckCircle2, Clock, Target, TrendingUp } from 'lucide-react';

const workoutProgram = {
  weeks: 12,
  currentWeek: 3,
  workouts: [
    {
      day: 1,
      name: 'Upper Body Power',
      focus: 'Chest, Shoulders, Triceps',
      duration: 45,
      exercises: [
        { name: 'Bench Press', sets: 4, reps: '8-10', rest: 90 },
        { name: 'Overhead Press', sets: 3, reps: '10-12', rest: 60 },
        { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: 60 },
        { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: 45 },
        { name: 'Tricep Dips', sets: 3, reps: '10-12', rest: 60 },
        { name: 'Cable Flyes', sets: 3, reps: '12-15', rest: 45 },
      ],
      completed: true,
    },
    {
      day: 2,
      name: 'Lower Body Strength',
      focus: 'Quads, Hamstrings, Glutes',
      duration: 50,
      exercises: [
        { name: 'Squats', sets: 4, reps: '8-10', rest: 120 },
        { name: 'Romanian Deadlifts', sets: 4, reps: '10-12', rest: 90 },
        { name: 'Leg Press', sets: 3, reps: '12-15', rest: 60 },
        { name: 'Walking Lunges', sets: 3, reps: '10/leg', rest: 60 },
        { name: 'Leg Curls', sets: 3, reps: '12-15', rest: 45 },
        { name: 'Calf Raises', sets: 4, reps: '15-20', rest: 45 },
      ],
      completed: false,
    },
    {
      day: 3,
      name: 'Rest Day',
      focus: 'Active Recovery',
      duration: 0,
      exercises: [],
      completed: false,
    },
    {
      day: 4,
      name: 'Pull Day',
      focus: 'Back, Biceps',
      duration: 45,
      exercises: [
        { name: 'Deadlifts', sets: 4, reps: '6-8', rest: 120 },
        { name: 'Pull-ups', sets: 3, reps: '8-10', rest: 90 },
        { name: 'Barbell Rows', sets: 4, reps: '10-12', rest: 60 },
        { name: 'Lat Pulldowns', sets: 3, reps: '12-15', rest: 60 },
        { name: 'Bicep Curls', sets: 3, reps: '10-12', rest: 45 },
        { name: 'Face Pulls', sets: 3, reps: '15-20', rest: 45 },
      ],
      completed: false,
    },
    {
      day: 5,
      name: 'Upper Body Hypertrophy',
      focus: 'Chest, Back, Arms',
      duration: 50,
      exercises: [
        { name: 'Incline Bench Press', sets: 4, reps: '10-12', rest: 60 },
        { name: 'Cable Rows', sets: 4, reps: '12-15', rest: 60 },
        { name: 'Dumbbell Flyes', sets: 3, reps: '12-15', rest: 45 },
        { name: 'Hammer Curls', sets: 3, reps: '10-12', rest: 45 },
        { name: 'Overhead Tricep Extension', sets: 3, reps: '12-15', rest: 45 },
        { name: 'Cable Crossovers', sets: 3, reps: '15-20', rest: 45 },
      ],
      completed: false,
    },
    {
      day: 6,
      name: 'Lower Body Power',
      focus: 'Legs, Core',
      duration: 45,
      exercises: [
        { name: 'Front Squats', sets: 4, reps: '8-10', rest: 90 },
        { name: 'Bulgarian Split Squats', sets: 3, reps: '10/leg', rest: 60 },
        { name: 'Leg Extensions', sets: 3, reps: '12-15', rest: 45 },
        { name: 'Hamstring Curls', sets: 3, reps: '12-15', rest: 45 },
        { name: 'Plank', sets: 3, reps: '60s', rest: 30 },
        { name: 'Russian Twists', sets: 3, reps: '20/side', rest: 30 },
      ],
      completed: false,
    },
    {
      day: 7,
      name: 'Rest Day',
      focus: 'Recovery',
      duration: 0,
      exercises: [],
      completed: false,
    },
  ],
};

export default function TrainingPage() {
  const { t } = useLanguage();
  const [selectedDay, setSelectedDay] = useState(workoutProgram.workouts[1]);

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            {t('training.title')}
          </h1>
          <p className="text-gray-400">
            {t('training.week')} {workoutProgram.currentWeek} of {workoutProgram.weeks}
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-cyan-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Program Progress</span>
            <span className="text-sm text-cyan-400">
              {Math.round((workoutProgram.currentWeek / workoutProgram.weeks) * 100)}%
            </span>
          </div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
              style={{ width: `${(workoutProgram.currentWeek / workoutProgram.weeks) * 100}%` }}
            />
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Weekly Schedule */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h2 className="text-lg font-bold mb-4">This Week</h2>
              <div className="space-y-2">
                {workoutProgram.workouts.map((workout) => (
                  <button
                    key={workout.day}
                    onClick={() => setSelectedDay(workout)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedDay.day === workout.day
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">
                        {t('training.day')} {workout.day}
                      </span>
                      {workout.completed && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div className="text-sm text-gray-400">{workout.name}</div>
                    {workout.duration > 0 && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {workout.duration} min
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Workout Details */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{selectedDay.name}</h2>
                  <p className="text-gray-400">{selectedDay.focus}</p>
                </div>
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                  {selectedDay.exercises.length} {t('training.exercises')}
                </Badge>
              </div>

              {selectedDay.duration === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Target className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t('training.rest')}</h3>
                  <p className="text-gray-400">
                    Take time to recover and prepare for your next workout
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {selectedDay.exercises.map((exercise, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-semibold">{exercise.name}</h3>
                              <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                                <span>{exercise.sets} sets</span>
                                <span>•</span>
                                <span>{exercise.reps} reps</span>
                                <span>•</span>
                                <span>{exercise.rest}s rest</span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    size="lg"
                  >
                    <Dumbbell className="w-5 h-5 mr-2" />
                    {t('training.startWorkout')}
                  </Button>
                </>
              )}
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <Card className="p-4 text-center">
                <TrendingUp className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">156</div>
                <div className="text-xs text-gray-400">Total Workouts</div>
              </Card>
              <Card className="p-4 text-center">
                <Clock className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">87h</div>
                <div className="text-xs text-gray-400">Time Trained</div>
              </Card>
              <Card className="p-4 text-center">
                <Target className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">92%</div>
                <div className="text-xs text-gray-400">Completion</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
