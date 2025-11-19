'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Trophy, Flame, Target, TrendingUp, MessageSquare } from 'lucide-react';

const challenges = [
  {
    id: 1,
    title: '30-Day Transformation',
    description: 'Complete all workouts for 30 consecutive days',
    type: 'workout',
    participants: 1247,
    daysLeft: 12,
    progress: 60,
    reward: 'Premium Badge',
    active: true,
  },
  {
    id: 2,
    title: 'Protein Goal Master',
    description: 'Hit your protein target every day this week',
    type: 'nutrition',
    participants: 892,
    daysLeft: 3,
    progress: 71,
    reward: '500 XP',
    active: true,
  },
  {
    id: 3,
    title: 'Early Bird Special',
    description: 'Complete morning workouts 5 days in a row',
    type: 'mindset',
    participants: 634,
    daysLeft: 5,
    progress: 40,
    reward: 'Morning Warrior Badge',
    active: false,
  },
];

const leaderboard = [
  { rank: 1, name: 'Alex Johnson', points: 2847, streak: 45, avatar: '👑' },
  { rank: 2, name: 'Sarah Williams', points: 2654, streak: 38, avatar: '🔥' },
  { rank: 3, name: 'Mike Chen', points: 2489, streak: 32, avatar: '💪' },
  { rank: 4, name: 'Emma Davis', points: 2301, streak: 28, avatar: '⚡' },
  { rank: 5, name: 'You', points: 2156, streak: 24, avatar: '🎯', isUser: true },
  { rank: 6, name: 'Chris Brown', points: 2089, streak: 22, avatar: '🚀' },
  { rank: 7, name: 'Lisa Anderson', points: 1967, streak: 19, avatar: '✨' },
  { rank: 8, name: 'Tom Wilson', points: 1845, streak: 17, avatar: '🏆' },
];

const channels = [
  { id: 1, name: 'General', members: 3421, unread: 5 },
  { id: 2, name: 'Workout Tips', members: 2156, unread: 0 },
  { id: 3, name: 'Nutrition Advice', members: 1893, unread: 2 },
  { id: 4, name: 'Progress Pics', members: 2847, unread: 12 },
  { id: 5, name: 'Motivation', members: 4102, unread: 0 },
];

export default function CommunityPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('challenges');

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'workout':
        return <Target className="w-5 h-5" />;
      case 'nutrition':
        return <Flame className="w-5 h-5" />;
      case 'mindset':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Trophy className="w-5 h-5" />;
    }
  };

  const getChallengeColor = (type: string) => {
    switch (type) {
      case 'workout':
        return 'from-cyan-500/20 to-blue-600/20 border-cyan-500/30';
      case 'nutrition':
        return 'from-green-500/20 to-emerald-600/20 border-green-500/30';
      case 'mindset':
        return 'from-purple-500/20 to-pink-600/20 border-purple-500/30';
      default:
        return 'from-orange-500/20 to-red-600/20 border-orange-500/30';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            {t('community.title')}
          </h1>
          <p className="text-gray-400">Connect, compete, and grow together</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/5">
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
          </TabsList>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-4">
            <Card className="p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-6 h-6 text-orange-500" />
                <h2 className="text-xl font-bold">{t('community.challenges')}</h2>
              </div>
              <p className="text-sm text-gray-400">
                Join challenges to earn rewards and compete with the community
              </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              {challenges.map((challenge) => (
                <Card
                  key={challenge.id}
                  className={`p-6 bg-gradient-to-br ${getChallengeColor(challenge.type)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        challenge.type === 'workout' ? 'bg-cyan-500/20 text-cyan-400' :
                        challenge.type === 'nutrition' ? 'bg-green-500/20 text-green-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {getChallengeIcon(challenge.type)}
                      </div>
                      <div>
                        <h3 className="font-bold">{challenge.title}</h3>
                        <p className="text-xs text-gray-400">{challenge.daysLeft} days left</p>
                      </div>
                    </div>
                    {challenge.active && (
                      <Badge variant="outline" className="border-green-500/30 text-green-400">
                        Active
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-gray-300 mb-4">{challenge.description}</p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span className="font-semibold">{challenge.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            challenge.type === 'workout' ? 'bg-gradient-to-r from-cyan-500 to-blue-600' :
                            challenge.type === 'nutrition' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                            'bg-gradient-to-r from-purple-500 to-pink-600'
                          }`}
                          style={{ width: `${challenge.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{challenge.participants.toLocaleString()} {t('community.participants')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-yellow-500">
                        <Trophy className="w-4 h-4" />
                        <span>{challenge.reward}</span>
                      </div>
                    </div>

                    <Button
                      className={`w-full ${
                        challenge.active
                          ? 'bg-white/10 hover:bg-white/20'
                          : challenge.type === 'workout'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                          : challenge.type === 'nutrition'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                          : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
                      }`}
                    >
                      {challenge.active ? 'View Progress' : t('community.join')}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-4">
            <Card className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-bold">{t('community.leaderboard')}</h2>
              </div>
              <p className="text-sm text-gray-400">
                Top performers this month
              </p>
            </Card>

            <Card className="p-6">
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`p-4 rounded-lg transition-all ${
                      user.isUser
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        user.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                        user.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                        user.rank === 3 ? 'bg-orange-500/20 text-orange-500' :
                        'bg-white/10 text-gray-400'
                      }`}>
                        {user.rank <= 3 ? <Trophy className="w-5 h-5" /> : `#${user.rank}`}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{user.avatar}</span>
                          <span className="font-semibold">{user.name}</span>
                          {user.isUser && (
                            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                              You
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                          <span>{user.points.toLocaleString()} points</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-3 h-3 text-orange-500" />
                            {user.streak} day streak
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Channels Tab */}
          <TabsContent value="channels" className="space-y-4">
            <Card className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-bold">Community Channels</h2>
              </div>
              <p className="text-sm text-gray-400">
                Connect with other members and share your journey
              </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              {channels.map((channel) => (
                <Card
                  key={channel.id}
                  className="p-6 hover:bg-white/5 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg mb-1">#{channel.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{channel.members.toLocaleString()} members</span>
                      </div>
                    </div>
                    {channel.unread > 0 && (
                      <Badge className="bg-cyan-500 text-white">
                        {channel.unread}
                      </Badge>
                    )}
                  </div>
                  <Button variant="outline" className="w-full border-blue-500/30">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Open Channel
                  </Button>
                </Card>
              ))}
            </div>

            {/* Premium Notice */}
            <Card className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">Free Tier: Limited to 2 channels</p>
                  <p className="text-xs text-gray-400">Upgrade to Premium for full community access</p>
                </div>
                <Button size="sm" variant="outline" className="border-yellow-500/30">
                  Upgrade
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
