'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Crown, Settings, LogOut, Check, Zap, Star, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const subscriptionPlans = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    features: [
      '3 workouts per week',
      '3 food scans per day',
      'Basic nutrition tracking',
      'Limited community access',
      'Progress tracking',
    ],
    limitations: [
      'No personalized AI plans',
      'Limited exercise library',
      'No meditation tools',
    ],
    current: true,
  },
  {
    name: 'Premium',
    price: 14.99,
    period: 'month',
    originalPrice: 14.99,
    features: [
      'Unlimited workouts',
      'Unlimited food scans',
      'Personalized AI workout plans',
      'Personalized nutrition plans',
      'Full exercise library',
      'Sleep & meditation tools',
      'Full community access',
      'Weekly challenges',
      'Priority support',
      'Ad-free experience',
    ],
    popular: true,
    current: false,
  },
];

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export default function ProfilePage() {
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');

  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2024',
    isPremium: false,
    stats: {
      workoutsCompleted: 156,
      currentStreak: 24,
      totalDays: 90,
      caloriesTracked: 198000,
    },
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {t('nav.profile')}
          </h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>

        {/* Profile Card */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-3xl font-bold">
                {userProfile.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                  {userProfile.isPremium && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                <p className="text-gray-400">{userProfile.email}</p>
                <p className="text-sm text-gray-500">Member since {userProfile.joinDate}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-cyan-400">{userProfile.stats.workoutsCompleted}</div>
            <div className="text-xs text-gray-400">Workouts</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-orange-400">{userProfile.stats.currentStreak}</div>
            <div className="text-xs text-gray-400">Day Streak</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-green-400">{userProfile.stats.totalDays}</div>
            <div className="text-xs text-gray-400">Total Days</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-purple-400">
              {(userProfile.stats.caloriesTracked / 1000).toFixed(0)}k
            </div>
            <div className="text-xs text-gray-400">Calories Tracked</div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Full Name</label>
                  <div className="mt-1 p-3 rounded-lg bg-white/5">{userProfile.name}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <div className="mt-1 p-3 rounded-lg bg-white/5">{userProfile.email}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Member Since</label>
                  <div className="mt-1 p-3 rounded-lg bg-white/5">{userProfile.joinDate}</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Fitness Profile</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-gray-400">Goal</span>
                  <span className="font-semibold">Build Muscle</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-gray-400">Level</span>
                  <span className="font-semibold">Intermediate</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-gray-400">Days per Week</span>
                  <span className="font-semibold">5 days</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-gray-400">Equipment</span>
                  <span className="font-semibold">Full Gym</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {subscriptionPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`p-6 relative ${
                    plan.popular
                      ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30'
                      : 'bg-white/5'
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">
                        {plan.price === 0 ? 'Free' : `€${plan.price}`}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-400">/{plan.period}</span>
                      )}
                    </div>
                    {plan.current && (
                      <Badge variant="outline" className="mt-2 border-green-500/30 text-green-400">
                        Current Plan
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations?.map((limitation, index) => (
                      <div key={index} className="flex items-start gap-2 opacity-50">
                        <span className="text-sm line-through">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
                  </Button>
                </Card>
              ))}
            </div>

            {/* Special Offer */}
            <Card className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-yellow-500/20">
                  <Zap className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">Limited Time Offer!</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Get your first month of Premium for just €7.49 (50% off)
                  </p>
                  <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                    Claim Offer
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Language</h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      language === lang.code
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </div>
                    {language === lang.code && (
                      <Check className="w-5 h-5 text-cyan-400" />
                    )}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Notifications</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span>Workout Reminders</span>
                  <Button size="sm" variant="outline">
                    Enabled
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span>Nutrition Tracking</span>
                  <Button size="sm" variant="outline">
                    Enabled
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span>Community Updates</span>
                  <Button size="sm" variant="outline">
                    Enabled
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 text-red-500">Danger Zone</h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </Button>
                <Button variant="outline" className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10">
                  Delete Account
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
