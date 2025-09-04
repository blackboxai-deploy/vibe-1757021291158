"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  BookOpen, 
  Target, 
  Calendar,
  Award,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart
} from 'lucide-react';

interface SubjectProgress {
  subject: string;
  totalHours: number;
  completedHours: number;
  weeklyTarget: number;
  currentWeekHours: number;
  lastWeekHours: number;
  topics: {
    name: string;
    completed: boolean;
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
}

export default function ProgressPage() {
  
  // Mock progress data (in real app, this would come from storage/API)
  const subjectProgress: SubjectProgress[] = [
    {
      subject: 'Accounting',
      totalHours: 45,
      completedHours: 28,
      weeklyTarget: 12,
      currentWeekHours: 10,
      lastWeekHours: 11,
      topics: [
        { name: 'Introduction to Accounting', completed: true, difficulty: 'easy' },
        { name: 'Double Entry System', completed: true, difficulty: 'medium' },
        { name: 'Accounting Equation', completed: true, difficulty: 'easy' },
        { name: 'Journal Entries', completed: true, difficulty: 'medium' },
        { name: 'Ledger Posting', completed: false, difficulty: 'medium' },
        { name: 'Trial Balance', completed: false, difficulty: 'hard' },
        { name: 'Financial Statements', completed: false, difficulty: 'hard' }
      ]
    },
    {
      subject: 'Law',
      totalHours: 35,
      completedHours: 20,
      weeklyTarget: 8,
      currentWeekHours: 6,
      lastWeekHours: 7,
      topics: [
        { name: 'Indian Contract Act', completed: true, difficulty: 'medium' },
        { name: 'Sale of Goods Act', completed: true, difficulty: 'medium' },
        { name: 'Partnership Act', completed: false, difficulty: 'hard' },
        { name: 'Companies Act Basics', completed: false, difficulty: 'hard' },
        { name: 'Consumer Protection Act', completed: false, difficulty: 'medium' }
      ]
    },
    {
      subject: 'Economics',
      totalHours: 20,
      completedHours: 12,
      weeklyTarget: 4,
      currentWeekHours: 3,
      lastWeekHours: 4,
      topics: [
        { name: 'Microeconomics Basics', completed: true, difficulty: 'easy' },
        { name: 'Demand and Supply', completed: true, difficulty: 'medium' },
        { name: 'Market Structures', completed: false, difficulty: 'hard' },
        { name: 'National Income', completed: false, difficulty: 'medium' }
      ]
    },
    {
      subject: 'Quantitative Aptitude',
      totalHours: 18,
      completedHours: 10,
      weeklyTarget: 4,
      currentWeekHours: 3,
      lastWeekHours: 3,
      topics: [
        { name: 'Basic Mathematics', completed: true, difficulty: 'easy' },
        { name: 'Ratio and Proportion', completed: true, difficulty: 'medium' },
        { name: 'Percentages', completed: false, difficulty: 'easy' },
        { name: 'Statistics Basics', completed: false, difficulty: 'medium' }
      ]
    }
  ];

  const overallStats = {
    totalStudyHours: subjectProgress.reduce((sum, subject) => sum + subject.completedHours, 0),
    totalTargetHours: subjectProgress.reduce((sum, subject) => sum + subject.totalHours, 0),
    currentStreak: 12,
    weeklyTarget: subjectProgress.reduce((sum, subject) => sum + subject.weeklyTarget, 0),
    currentWeekProgress: subjectProgress.reduce((sum, subject) => sum + subject.currentWeekHours, 0)
  };

  const overallProgress = (overallStats.totalStudyHours / overallStats.totalTargetHours) * 100;
  const weeklyProgress = (overallStats.currentWeekProgress / overallStats.weeklyTarget) * 100;

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
      hard: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
    };
    return colors[difficulty as keyof typeof colors] || colors.medium;
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Accounting': 'text-blue-600',
      'Law': 'text-purple-600',
      'Economics': 'text-green-600',
      'Quantitative Aptitude': 'text-orange-600'
    };
    return colors[subject as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
          <TrendingUp className="w-8 h-8 mr-3 text-blue-600" />
          Study Progress Tracking
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Monitor your CA Foundation study progress and performance analytics
        </p>
      </div>

      {/* Overall Progress Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {Math.round(overallProgress)}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
              <Progress value={overallProgress} className="mt-2 h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {overallStats.currentStreak}
              </div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
              <div className="text-xs text-green-600 mt-1">Keep it up! 🔥</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {overallStats.totalStudyHours}h
              </div>
              <div className="text-sm text-muted-foreground">Total Study Time</div>
              <div className="text-xs text-muted-foreground mt-1">
                of {overallStats.totalTargetHours}h target
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {Math.round(weeklyProgress)}%
              </div>
              <div className="text-sm text-muted-foreground">This Week</div>
              <Progress value={weeklyProgress} className="mt-2 h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subjects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="subjects">Subject Progress</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Analysis</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* Subject-wise Progress */}
        <TabsContent value="subjects">
          <div className="grid lg:grid-cols-2 gap-6">
            {subjectProgress.map((subject) => {
              const subjectProgressPercent = (subject.completedHours / subject.totalHours) * 100;
              const weeklyProgressPercent = (subject.currentWeekHours / subject.weeklyTarget) * 100;
              const completedTopics = subject.topics.filter(topic => topic.completed).length;
              
              return (
                <Card key={subject.subject}>
                  <CardHeader>
                    <CardTitle className={`flex items-center justify-between ${getSubjectColor(subject.subject)}`}>
                      <div className="flex items-center">
                        <BookOpen className="w-5 h-5 mr-2" />
                        {subject.subject}
                      </div>
                      <Badge variant="outline">
                        {Math.round(subjectProgressPercent)}%
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {subject.completedHours}h of {subject.totalHours}h completed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Overall Subject Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Progress</span>
                        <span className="font-semibold">{Math.round(subjectProgressPercent)}%</span>
                      </div>
                      <Progress value={subjectProgressPercent} className="h-2" />
                    </div>

                    {/* Weekly Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>This Week ({subject.currentWeekHours}h / {subject.weeklyTarget}h)</span>
                        <span className="font-semibold">{Math.round(weeklyProgressPercent)}%</span>
                      </div>
                      <Progress value={weeklyProgressPercent} className="h-2" />
                    </div>

                    {/* Topics Progress */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Topics</span>
                        <span className="text-sm text-muted-foreground">
                          {completedTopics}/{subject.topics.length} completed
                        </span>
                      </div>
                      <div className="space-y-1">
                        {subject.topics.map((topic, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded-lg border border-slate-100 dark:border-slate-800"
                          >
                            <div className="flex items-center space-x-2">
                              {topic.completed ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                              )}
                              <span className={`text-sm ${topic.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {topic.name}
                              </span>
                            </div>
                            <Badge variant="secondary" className={`text-xs ${getDifficultyColor(topic.difficulty)}`}>
                              {topic.difficulty}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Weekly Analysis */}
        <TabsContent value="weekly">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Weekly Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  Weekly Comparison
                </CardTitle>
                <CardDescription>
                  Current week vs last week performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectProgress.map((subject) => (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{subject.subject}</span>
                        <div className="text-right">
                          <div className="text-green-600">
                            This week: {subject.currentWeekHours}h
                          </div>
                          <div className="text-slate-500 text-xs">
                            Last week: {subject.lastWeekHours}h
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex-1">
                          <Progress 
                            value={(subject.currentWeekHours / subject.weeklyTarget) * 100} 
                            className="h-2"
                          />
                        </div>
                        <div className="w-16 text-xs text-right text-muted-foreground">
                          {Math.round((subject.currentWeekHours / subject.weeklyTarget) * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Study Pattern Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-purple-600" />
                  Study Pattern
                </CardTitle>
                <CardDescription>
                  Time distribution across subjects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectProgress.map((subject) => {
                    const percentage = (subject.completedHours / overallStats.totalStudyHours) * 100;
                    return (
                      <div key={subject.subject} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className={`font-medium ${getSubjectColor(subject.subject)}`}>
                            {subject.subject}
                          </span>
                          <span>{Math.round(percentage)}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {subject.completedHours}h total study time
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Achievements */}
        <TabsContent value="achievements">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-600" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <Award className="w-6 h-6 text-yellow-600" />
                  <div>
                    <div className="font-semibold">12-Day Streak!</div>
                    <div className="text-sm text-muted-foreground">Consistent daily study</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-semibold">Accounting Fundamentals</div>
                    <div className="text-sm text-muted-foreground">Completed 4 major topics</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Target className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-semibold">Weekly Target Met</div>
                    <div className="text-sm text-muted-foreground">Last week: 28h / 28h target</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Goals & Targets */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  Current Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Weekly Study Target</span>
                    <span className="font-semibold">
                      {overallStats.currentWeekProgress}h / {overallStats.weeklyTarget}h
                    </span>
                  </div>
                  <Progress value={weeklyProgress} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Foundation Course Completion</span>
                    <span className="font-semibold">{Math.round(overallProgress)}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </div>
                
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <span className="font-semibold text-sm">Focus Areas</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Complete Ledger Posting (Accounting)</li>
                    <li>• Study Partnership Act (Law)</li>
                    <li>• Practice Percentage problems (Quant)</li>
                  </ul>
                </div>
                
                <Button className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Set New Goals
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}