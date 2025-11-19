'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Camera, Weight, Ruler, Calendar, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const weightData = [
  { date: 'Jan 1', weight: 85 },
  { date: 'Jan 15', weight: 84.2 },
  { date: 'Feb 1', weight: 83.5 },
  { date: 'Feb 15', weight: 82.8 },
  { date: 'Mar 1', weight: 82.1 },
  { date: 'Mar 15', weight: 81.5 },
];

const strengthData = [
  { exercise: 'Bench Press', current: 100, previous: 90, unit: 'kg' },
  { exercise: 'Squat', current: 140, previous: 130, unit: 'kg' },
  { exercise: 'Deadlift', current: 160, previous: 145, unit: 'kg' },
  { exercise: 'Overhead Press', current: 65, previous: 60, unit: 'kg' },
];

const measurements = {
  current: {
    chest: 102,
    waist: 82,
    hips: 98,
    arms: 38,
    legs: 58,
  },
  previous: {
    chest: 98,
    waist: 86,
    hips: 100,
    arms: 36,
    legs: 56,
  },
};

const progressPhotos = [
  { id: 1, date: 'March 15, 2024', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop' },
  { id: 2, date: 'February 15, 2024', url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=600&fit=crop' },
  { id: 3, date: 'January 15, 2024', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=600&fit=crop' },
];

export default function ProgressPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('weight');

  const getMeasurementChange = (current: number, previous: number) => {
    const diff = current - previous;
    return {
      value: Math.abs(diff),
      isPositive: diff > 0,
      percentage: ((diff / previous) * 100).toFixed(1),
    };
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
            {t('progress.title')}
          </h1>
          <p className="text-gray-400">Track your transformation journey</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 text-center bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-cyan-500/20">
            <Weight className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">81.5kg</div>
            <div className="text-xs text-gray-400">Current Weight</div>
            <div className="flex items-center justify-center gap-1 text-xs text-green-500 mt-1">
              <ArrowDown className="w-3 h-3" />
              3.5kg lost
            </div>
          </Card>

          <Card className="p-4 text-center bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20">
            <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">18%</div>
            <div className="text-xs text-gray-400">Body Fat</div>
            <div className="flex items-center justify-center gap-1 text-xs text-green-500 mt-1">
              <ArrowDown className="w-3 h-3" />
              2% reduced
            </div>
          </Card>

          <Card className="p-4 text-center bg-gradient-to-br from-purple-500/10 to-pink-600/10 border-purple-500/20">
            <Ruler className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">102cm</div>
            <div className="text-xs text-gray-400">Chest</div>
            <div className="flex items-center justify-center gap-1 text-xs text-green-500 mt-1">
              <ArrowUp className="w-3 h-3" />
              4cm gained
            </div>
          </Card>

          <Card className="p-4 text-center bg-gradient-to-br from-orange-500/10 to-red-600/10 border-orange-500/20">
            <Calendar className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">90</div>
            <div className="text-xs text-gray-400">Days Active</div>
            <div className="text-xs text-green-500 mt-1">
              On track!
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/5">
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="strength">Strength</TabsTrigger>
            <TabsTrigger value="measurements">Body</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>

          {/* Weight Tab */}
          <TabsContent value="weight" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{t('progress.weight')} Tracking</h2>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('progress.addEntry')}
                </Button>
              </div>

              <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" domain={[80, 86]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #333',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#06b6d4"
                      strokeWidth={3}
                      dot={{ fill: '#06b6d4', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-cyan-500/10">
                  <div className="text-sm text-gray-400 mb-1">Starting</div>
                  <div className="text-2xl font-bold text-cyan-400">85.0kg</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-green-500/10">
                  <div className="text-sm text-gray-400 mb-1">Current</div>
                  <div className="text-2xl font-bold text-green-400">81.5kg</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-500/10">
                  <div className="text-sm text-gray-400 mb-1">Goal</div>
                  <div className="text-2xl font-bold text-purple-400">78.0kg</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Strength Tab */}
          <TabsContent value="strength" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Strength Progress</h2>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Log Lift
                </Button>
              </div>

              <div className="space-y-4">
                {strengthData.map((exercise, index) => {
                  const improvement = exercise.current - exercise.previous;
                  const percentage = ((improvement / exercise.previous) * 100).toFixed(1);
                  return (
                    <div key={index} className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{exercise.exercise}</h3>
                        <Badge variant="outline" className="border-green-500/30 text-green-400">
                          +{improvement}{exercise.unit} (+{percentage}%)
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-400">Previous</span>
                            <span className="font-semibold">{exercise.previous}{exercise.unit}</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gray-600"
                              style={{ width: `${(exercise.previous / exercise.current) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-400">Current</span>
                            <span className="font-semibold text-cyan-400">{exercise.current}{exercise.unit}</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          {/* Measurements Tab */}
          <TabsContent value="measurements" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{t('progress.measurements')}</h2>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Update
                </Button>
              </div>

              <div className="space-y-4">
                {Object.entries(measurements.current).map(([key, value]) => {
                  const change = getMeasurementChange(value, measurements.previous[key as keyof typeof measurements.previous]);
                  return (
                    <div key={key} className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Ruler className="w-5 h-5 text-purple-400" />
                            <span className="font-semibold capitalize">{key}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div>
                              <div className="text-2xl font-bold text-purple-400">{value}cm</div>
                              <div className="text-xs text-gray-400">Current</div>
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${
                              (key === 'waist' && !change.isPositive) || (key !== 'waist' && change.isPositive)
                                ? 'text-green-500'
                                : 'text-red-500'
                            }`}>
                              {change.isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                              {change.value}cm ({change.percentage}%)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{t('progress.photos')}</h2>
                <Button size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Add Photo
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {progressPhotos.map((photo) => (
                  <div key={photo.id} className="group relative rounded-lg overflow-hidden">
                    <img
                      src={photo.url}
                      alt={`Progress ${photo.date}`}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-sm font-semibold">{photo.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
