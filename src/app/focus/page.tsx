"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Target, 
  Play, 
  Pause, 
  Square, 
  Clock, 
  BookOpen, 
  Eye, 
  EyeOff,
  Shield,
  AlertTriangle
} from 'lucide-react';

interface FocusSession {
  subject: string;
  duration: number; // in minutes
  timeRemaining: number; // in seconds
  isActive: boolean;
  isPaused: boolean;
  blockedSites: string[];
  notes: string;
}

export default function FocusMode() {
  const [session, setSession] = useState<FocusSession>({
    subject: '',
    duration: 25, // Default 25 minutes (Pomodoro)
    timeRemaining: 25 * 60, // 25 minutes in seconds
    isActive: false,
    isPaused: false,
    blockedSites: [
      'facebook.com',
      'instagram.com', 
      'twitter.com',
      'youtube.com',
      'netflix.com',
      'reddit.com'
    ],
    notes: ''
  });
  
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [newBlockedSite, setNewBlockedSite] = useState('');
  const [showBlockedSites, setShowBlockedSites] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (session.isActive && !session.isPaused && session.timeRemaining > 0) {
      interval = setInterval(() => {
        setSession(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
    } else if (session.timeRemaining === 0 && session.isActive) {
      // Session completed
      setSession(prev => ({ ...prev, isActive: false }));
      // Show notification or alert
      alert('Focus session completed! Great job! 🎉');
    }

    return () => clearInterval(interval);
  }, [session.isActive, session.isPaused, session.timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startSession = () => {
    if (!session.subject.trim()) {
      alert('Please enter a subject to study');
      return;
    }
    
    setSession(prev => ({
      ...prev,
      isActive: true,
      isPaused: false,
      timeRemaining: prev.duration * 60
    }));
  };

  const pauseSession = () => {
    setSession(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const stopSession = () => {
    setSession(prev => ({
      ...prev,
      isActive: false,
      isPaused: false,
      timeRemaining: prev.duration * 60
    }));
  };

  const addBlockedSite = () => {
    if (newBlockedSite.trim() && !session.blockedSites.includes(newBlockedSite.trim())) {
      setSession(prev => ({
        ...prev,
        blockedSites: [...prev.blockedSites, newBlockedSite.trim()]
      }));
      setNewBlockedSite('');
    }
  };

  const removeBlockedSite = (site: string) => {
    setSession(prev => ({
      ...prev,
      blockedSites: prev.blockedSites.filter(s => s !== site)
    }));
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullScreen(!isFullScreen);
  };

  const progress = ((session.duration * 60 - session.timeRemaining) / (session.duration * 60)) * 100;

  if (session.isActive && isFullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-900 text-white flex flex-col items-center justify-center z-50">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{session.subject}</h1>
            <div className="text-8xl font-mono font-bold text-blue-400">
              {formatTime(session.timeRemaining)}
            </div>
            <Progress value={progress} className="w-96 h-3" />
          </div>
          
          <div className="flex space-x-4">
            <Button 
              onClick={pauseSession} 
              variant="secondary" 
              size="lg"
              className="px-8"
            >
              {session.isPaused ? (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              )}
            </Button>
            <Button 
              onClick={stopSession} 
              variant="destructive" 
              size="lg"
              className="px-8"
            >
              <Square className="w-5 h-5 mr-2" />
              Stop
            </Button>
            <Button 
              onClick={toggleFullScreen} 
              variant="outline" 
              size="lg"
              className="px-8"
            >
              Exit Fullscreen
            </Button>
          </div>

          {session.isPaused && (
            <div className="text-yellow-400 font-semibold">Session Paused</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
          <Target className="w-8 h-8 mr-3 text-blue-600" />
          Focus Mode
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Eliminate distractions and focus on your CA Foundation studies
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Session Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Study Session Setup
            </CardTitle>
            <CardDescription>
              Configure your focused study session
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="e.g., Accounting, Law, Economics"
                value={session.subject}
                onChange={(e) => setSession(prev => ({ ...prev, subject: e.target.value }))}
                disabled={session.isActive}
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min="5"
                max="180"
                value={session.duration}
                onChange={(e) => {
                  const duration = parseInt(e.target.value) || 25;
                  setSession(prev => ({ 
                    ...prev, 
                    duration,
                    timeRemaining: duration * 60
                  }));
                }}
                disabled={session.isActive}
              />
            </div>

            <div>
              <Label htmlFor="notes">Session Notes</Label>
              <Textarea
                id="notes"
                placeholder="What will you focus on in this session?"
                value={session.notes}
                onChange={(e) => setSession(prev => ({ ...prev, notes: e.target.value }))}
                disabled={session.isActive}
              />
            </div>
          </CardContent>
        </Card>

        {/* Current Session Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Session Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <div>
                <div className="text-6xl font-mono font-bold text-slate-900 dark:text-white">
                  {formatTime(session.timeRemaining)}
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  {session.subject || 'No subject selected'}
                </div>
              </div>

              <Progress value={progress} className="h-3" />

              <div className="flex justify-center space-x-3">
                {!session.isActive ? (
                  <Button onClick={startSession} size="lg" className="px-8">
                    <Play className="w-5 h-5 mr-2" />
                    Start Focus Session
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={pauseSession} 
                      variant="secondary" 
                      size="lg"
                    >
                      {session.isPaused ? (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Resume
                        </>
                      ) : (
                        <>
                          <Pause className="w-5 h-5 mr-2" />
                          Pause
                        </>
                      )}
                    </Button>
                    <Button onClick={stopSession} variant="destructive" size="lg">
                      <Square className="w-5 h-5 mr-2" />
                      Stop
                    </Button>
                    <Button onClick={toggleFullScreen} variant="outline" size="lg">
                      Fullscreen
                    </Button>
                  </>
                )}
              </div>

              {session.isActive && (
                <Badge variant={session.isPaused ? "secondary" : "default"} className="text-sm">
                  {session.isPaused ? 'Paused' : 'Active Session'}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Website Blocker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Website Blocker
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBlockedSites(!showBlockedSites)}
            >
              {showBlockedSites ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          </CardTitle>
          <CardDescription>
            Manage distracting websites to block during focus sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Add website to block (e.g., facebook.com)"
                value={newBlockedSite}
                onChange={(e) => setNewBlockedSite(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addBlockedSite()}
              />
              <Button onClick={addBlockedSite}>Add</Button>
            </div>

            {showBlockedSites && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Blocked Sites:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {session.blockedSites.map((site) => (
                    <div
                      key={site}
                      className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg"
                    >
                      <span className="text-sm">{site}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBlockedSite(site)}
                        className="h-auto p-1 text-red-600"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Override */}
      <Card className="border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-700 dark:text-orange-400">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Emergency Override
          </CardTitle>
          <CardDescription>
            Use only for work emergencies during study sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            className="border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400"
            disabled={!session.isActive}
          >
            Emergency Exit (5 min cooldown)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}