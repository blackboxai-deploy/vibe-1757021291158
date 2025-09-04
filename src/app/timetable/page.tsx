"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  BookOpen, 
  Target, 
  Coffee, 
  Moon, 
  Sun,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface TimeSlot {
  time: string;
  subject: string;
  type: 'study' | 'work' | 'break' | 'sleep' | 'revision';
  duration: string;
  description?: string;
  completed?: boolean;
}

interface DaySchedule {
  day: string;
  date?: string;
  slots: TimeSlot[];
}

export default function TimetablePage() {
  const [selectedDay, setSelectedDay] = useState('monday');

  // Your personalized CA Foundation timetable
  const weekSchedule: Record<string, DaySchedule> = {
    monday: {
      day: 'Monday',
      slots: [
        { time: '06:00 - 07:00', subject: 'Accounting', type: 'study', duration: '1h', description: 'Morning focus session - Fundamentals' },
        { time: '07:00 - 08:00', subject: 'Break & Preparation', type: 'break', duration: '1h', description: 'Breakfast and work preparation' },
        { time: '08:00 - 10:30', subject: 'Accounting', type: 'study', duration: '2.5h', description: 'Deep practice - Problems & Theory' },
        { time: '11:00 - 19:30', subject: 'Work Hours', type: 'work', duration: '8.5h', description: 'Professional responsibilities' },
        { time: '20:00 - 22:00', subject: 'Law', type: 'study', duration: '2h', description: 'Evening revision - Legal concepts' },
        { time: '22:00 - 23:00', subject: 'Review & Planning', type: 'break', duration: '1h', description: 'Day review and next day planning' },
        { time: '23:00 - 06:00', subject: 'Sleep', type: 'sleep', duration: '7h', description: 'Rest and recovery' }
      ]
    },
    tuesday: {
      day: 'Tuesday',
      slots: [
        { time: '06:00 - 07:00', subject: 'Law', type: 'study', duration: '1h', description: 'Morning session - Legal provisions' },
        { time: '07:00 - 08:00', subject: 'Break & Preparation', type: 'break', duration: '1h', description: 'Breakfast and work preparation' },
        { time: '08:00 - 10:30', subject: 'Law', type: 'study', duration: '2.5h', description: 'Case studies and applications' },
        { time: '11:00 - 19:30', subject: 'Work Hours', type: 'work', duration: '8.5h', description: 'Professional responsibilities' },
        { time: '20:00 - 22:00', subject: 'Accounting', type: 'study', duration: '2h', description: 'Practice problems and review' },
        { time: '22:00 - 23:00', subject: 'Review & Planning', type: 'break', duration: '1h', description: 'Day review and next day planning' },
        { time: '23:00 - 06:00', subject: 'Sleep', type: 'sleep', duration: '7h', description: 'Rest and recovery' }
      ]
    },
    wednesday: {
      day: 'Wednesday',
      slots: [
        { time: '06:00 - 07:00', subject: 'Accounting', type: 'study', duration: '1h', description: 'Morning focus - Advanced topics' },
        { time: '07:00 - 08:00', subject: 'Break & Preparation', type: 'break', duration: '1h', description: 'Breakfast and work preparation' },
        { time: '08:00 - 10:30', subject: 'Accounting', type: 'study', duration: '2.5h', description: 'Complex problem solving' },
        { time: '11:00 - 19:30', subject: 'Work Hours', type: 'work', duration: '8.5h', description: 'Professional responsibilities' },
        { time: '20:00 - 22:00', subject: 'Economics', type: 'study', duration: '2h', description: 'MCQ practice and concepts' },
        { time: '22:00 - 23:00', subject: 'Review & Planning', type: 'break', duration: '1h', description: 'Day review and next day planning' },
        { time: '23:00 - 06:00', subject: 'Sleep', type: 'sleep', duration: '7h', description: 'Rest and recovery' }
      ]
    },
    thursday: {
      day: 'Thursday',
      slots: [
        { time: '06:00 - 07:00', subject: 'Law', type: 'study', duration: '1h', description: 'Morning revision - Key concepts' },
        { time: '07:00 - 08:00', subject: 'Break & Preparation', type: 'break', duration: '1h', description: 'Breakfast and work preparation' },
        { time: '08:00 - 10:30', subject: 'Law', type: 'study', duration: '2.5h', description: 'Detailed study and practice' },
        { time: '11:00 - 19:30', subject: 'Work Hours', type: 'work', duration: '8.5h', description: 'Professional responsibilities' },
        { time: '20:00 - 22:00', subject: 'Quantitative Aptitude', type: 'study', duration: '2h', description: 'MCQ practice and problem solving' },
        { time: '22:00 - 23:00', subject: 'Review & Planning', type: 'break', duration: '1h', description: 'Day review and next day planning' },
        { time: '23:00 - 06:00', subject: 'Sleep', type: 'sleep', duration: '7h', description: 'Rest and recovery' }
      ]
    },
    friday: {
      day: 'Friday',
      slots: [
        { time: '06:00 - 07:00', subject: 'Accounting', type: 'study', duration: '1h', description: 'Week-end review preparation' },
        { time: '07:00 - 08:00', subject: 'Break & Preparation', type: 'break', duration: '1h', description: 'Breakfast and work preparation' },
        { time: '08:00 - 10:30', subject: 'Mixed Review', type: 'study', duration: '2.5h', description: 'All subjects quick review' },
        { time: '11:00 - 19:30', subject: 'Work Hours', type: 'work', duration: '8.5h', description: 'Professional responsibilities' },
        { time: '20:00 - 22:00', subject: 'Practice Tests', type: 'study', duration: '2h', description: 'Mock tests and assessment' },
        { time: '22:00 - 23:00', subject: 'Week Review', type: 'break', duration: '1h', description: 'Week assessment and planning' },
        { time: '23:00 - 06:00', subject: 'Sleep', type: 'sleep', duration: '7h', description: 'Rest and recovery' }
      ]
    },
    saturday: {
      day: 'Saturday',
      slots: [
        { time: '06:00 - 07:00', subject: 'Accounting', type: 'study', duration: '1h', description: 'Weekend intensive start' },
        { time: '07:00 - 08:00', subject: 'Break & Preparation', type: 'break', duration: '1h', description: 'Breakfast and work preparation' },
        { time: '08:00 - 10:30', subject: 'Accounting', type: 'study', duration: '2.5h', description: 'Intensive problem practice' },
        { time: '11:00 - 19:30', subject: 'Work Hours', type: 'work', duration: '8.5h', description: 'Professional responsibilities' },
        { time: '20:00 - 22:00', subject: 'Law', type: 'study', duration: '2h', description: 'Weekend revision session' },
        { time: '22:00 - 23:00', subject: 'Sunday Planning', type: 'break', duration: '1h', description: 'Revision day preparation' },
        { time: '23:00 - 06:00', subject: 'Sleep', type: 'sleep', duration: '7h', description: 'Rest and recovery' }
      ]
    },
    sunday: {
      day: 'Sunday - Revision Day',
      slots: [
        { time: '07:00 - 09:00', subject: 'All Subjects Revision', type: 'revision', duration: '2h', description: 'Week overview - all topics' },
        { time: '09:00 - 10:00', subject: 'Break', type: 'break', duration: '1h', description: 'Rest and refreshment' },
        { time: '10:00 - 12:00', subject: 'Practice Tests', type: 'revision', duration: '2h', description: 'Full-length mock tests' },
        { time: '12:00 - 14:00', subject: 'Lunch & Rest', type: 'break', duration: '2h', description: 'Meal and relaxation' },
        { time: '14:00 - 16:00', subject: 'Weak Areas Focus', type: 'revision', duration: '2h', description: 'Target problem areas' },
        { time: '16:00 - 17:00', subject: 'Break', type: 'break', duration: '1h', description: 'Short break' },
        { time: '17:00 - 19:00', subject: 'Next Week Planning', type: 'revision', duration: '2h', description: 'Weekly planning and goal setting' },
        { time: '19:00 - 23:00', subject: 'Personal Time', type: 'break', duration: '4h', description: 'Family time and relaxation' },
        { time: '23:00 - 07:00', subject: 'Sleep', type: 'sleep', duration: '8h', description: 'Extended rest for new week' }
      ]
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      study: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      work: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300',
      break: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      sleep: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
      revision: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
    };
    return colors[type as keyof typeof colors] || colors.study;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      study: BookOpen,
      work: Target,
      break: Coffee,
      sleep: Moon,
      revision: CheckCircle
    };
    return icons[type as keyof typeof icons] || BookOpen;
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  // Calculate weekly study hours
  const weeklyStats = {
    totalStudyHours: 0,
    accountingHours: 0,
    lawHours: 0,
    economicsHours: 1,
    quantHours: 1
  };

  days.forEach(day => {
    weekSchedule[day].slots.forEach(slot => {
      if (slot.type === 'study' || slot.type === 'revision') {
        const hours = parseFloat(slot.duration);
        weeklyStats.totalStudyHours += hours;
        
        if (slot.subject.toLowerCase().includes('accounting')) {
          weeklyStats.accountingHours += hours;
        } else if (slot.subject.toLowerCase().includes('law')) {
          weeklyStats.lawHours += hours;
        }
      }
    });
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
          <Calendar className="w-8 h-8 mr-3 text-blue-600" />
          CA Foundation Study Timetable
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Your personalized schedule optimized for work-study balance (11:00 AM - 7:30 PM work hours)
        </p>
      </div>

      {/* Weekly Overview Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{weeklyStats.totalStudyHours}h</div>
              <div className="text-sm text-muted-foreground">Total Study Hours/Week</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{weeklyStats.accountingHours}h</div>
              <div className="text-sm text-muted-foreground">Accounting</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{weeklyStats.lawHours}h</div>
              <div className="text-sm text-muted-foreground">Law</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">2h</div>
              <div className="text-sm text-muted-foreground">Economics + Quant</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Day Navigation */}
      <Tabs value={selectedDay} onValueChange={setSelectedDay} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          {days.map((day) => (
            <TabsTrigger key={day} value={day} className="text-xs">
              {weekSchedule[day].day.split(' ')[0].slice(0, 3)}
            </TabsTrigger>
          ))}
        </TabsList>

        {days.map((day) => (
          <TabsContent key={day} value={day}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    {weekSchedule[day].day}
                  </div>
                  {day === 'sunday' && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      Revision Day
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  {day === 'sunday' 
                    ? 'Comprehensive revision and planning day' 
                    : 'Work day with optimized study sessions'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weekSchedule[day].slots.map((slot, index) => {
                    const IconComponent = getTypeIcon(slot.type);
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(slot.type)}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {slot.subject}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {slot.duration}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {slot.description}
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            {slot.time}
                          </div>
                          {slot.type === 'sleep' && (
                            <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                              <Moon className="w-3 h-3 inline mr-1" />
                              Sleep Schedule
                            </div>
                          )}
                          {slot.type === 'study' && slot.time.startsWith('06:00') && (
                            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                              <Sun className="w-3 h-3 inline mr-1" />
                              Morning Focus
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Study Tips */}
      <Card className="mt-8 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
            <AlertCircle className="w-5 h-5 mr-2" />
            Personalized Study Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Morning Sessions (6:00-7:00 AM)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Most productive time - tackle difficult concepts</li>
                <li>• Fresh mind for complex Accounting problems</li>
                <li>• Maintain 6:00-7:00 AM wake-up consistently</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Evening Sessions (8:00-10:00 PM)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Review and practice after work</li>
                <li>• Focus on understanding rather than cramming</li>
                <li>• Maintain 11:00 PM - 12:00 AM sleep schedule</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Subject Strategy</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Accounting: 4 days/week (Primary focus)</li>
                <li>• Law: 3 days/week (Regular practice)</li>
                <li>• Economics & Quant: 1 day each (MCQ focus)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Sunday Revision</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Complete week overview</li>
                <li>• Practice tests and mock exams</li>
                <li>• Identify and work on weak areas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}