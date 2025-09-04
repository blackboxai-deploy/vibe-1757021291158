"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Target, BookOpen, Calendar, Timer, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const todayProgress = 65;
  const studyStreak = 12;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const quickActions = [
    {
      title: 'Start Focus Session',
      description: 'Begin a distraction-free study session',
      href: '/focus',
      icon: Target,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Study Timer',
      description: 'Pomodoro timer and stopwatch',
      href: '/timer',
      icon: Timer,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'My Timetable',
      description: 'View your personalized study schedule',
      href: '/timetable',
      icon: Calendar,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your study progress',
      href: '/progress',
      icon: TrendingUp,
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  const todaySubjects = ['Accounting', 'Law', 'Economics'];
  const nextAlarm = '06:30 AM';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            CA Foundation Study Hub
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Your focused study companion for CA Foundation success
          </p>
        </div>

        {/* Current Time & Date Display */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Current Time
                </span>
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">
                {formatTime(currentTime)}
              </div>
              <div className="text-lg text-slate-600 dark:text-slate-300">
                {formatDate(currentTime)}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Progress */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                Today's Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Study Goal</span>
                  <span className="font-semibold">{todayProgress}%</span>
                </div>
                <Progress value={todayProgress} className="h-2" />
                <div className="text-xs text-slate-500">
                  2.5 hours completed of 4 hours target
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Study Streak */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                Study Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {studyStreak}
                </div>
                <div className="text-sm text-slate-500">consecutive days</div>
                <Badge variant="secondary" className="mt-2">
                  Keep it up! 🔥
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Next Alarm */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Clock className="w-5 h-5 mr-2 text-purple-600" />
                Next Alarm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {nextAlarm}
                </div>
                <div className="text-sm text-slate-500">Tomorrow</div>
                <Button variant="outline" size="sm" className="mt-2">
                  Manage Alarms
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Today's Study Schedule
            </CardTitle>
            <CardDescription>
              Your personalized CA Foundation timetable for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              {todaySubjects.map((subject, index) => (
                <div
                  key={subject}
                  className="p-4 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 text-center"
                >
                  <div className="font-semibold text-slate-900 dark:text-white mb-1">
                    {subject}
                  </div>
                  <div className="text-sm text-slate-500">
                    {index === 0 ? '6:00-7:00 AM' : index === 1 ? '8:00-9:30 AM' : '8:00-9:00 PM'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Link key={action.title} href={action.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-200 dark:hover:border-blue-800">
                    <CardContent className="p-6 text-center">
                      <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                        {action.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {action.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}