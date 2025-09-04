"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Timer, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw,
  AlarmClock,
  Plus,
  Trash2,
  Bell
} from 'lucide-react';

interface Alarm {
  id: string;
  time: string;
  label: string;
  isEnabled: boolean;
  daysOfWeek: boolean[];
}

export default function TimerPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Pomodoro Timer State
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes
  const [pomodoroRemaining, setPomodoroRemaining] = useState(25 * 60);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroPaused, setPomodoroPaused] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<'work' | 'break'>('work');
  
  // Stopwatch State
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchActive, setStopwatchActive] = useState(false);
  
  // Countdown Timer State
  const [countdownMinutes, setCountdownMinutes] = useState(30);
  const [countdownSeconds, setCountdownSeconds] = useState(0);
  const [countdownRemaining, setCountdownRemaining] = useState(30 * 60);
  const [countdownActive, setCountdownActive] = useState(false);
  const [countdownPaused, setCountdownPaused] = useState(false);
  
  // Alarms State
  const [alarms, setAlarms] = useState<Alarm[]>([
    {
      id: '1',
      time: '06:00',
      label: 'Wake Up - Study Time',
      isEnabled: true,
      daysOfWeek: [true, true, true, true, true, true, false] // Mon-Sat
    },
    {
      id: '2',
      time: '06:30',
      label: 'Alternative Wake Up',
      isEnabled: false,
      daysOfWeek: [true, true, true, true, true, true, false]
    },
    {
      id: '3',
      time: '23:00',
      label: 'Sleep Reminder',
      isEnabled: true,
      daysOfWeek: [true, true, true, true, true, true, true]
    }
  ]);
  const [newAlarmTime, setNewAlarmTime] = useState('07:00');
  const [newAlarmLabel, setNewAlarmLabel] = useState('');

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Pomodoro Timer Effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (pomodoroActive && !pomodoroPaused && pomodoroRemaining > 0) {
      interval = setInterval(() => {
        setPomodoroRemaining(prev => prev - 1);
      }, 1000);
    } else if (pomodoroRemaining === 0 && pomodoroActive) {
      // Switch between work and break
      if (pomodoroMode === 'work') {
        setPomodoroMode('break');
        setPomodoroTime(5 * 60); // 5 minute break
        setPomodoroRemaining(5 * 60);
        alert('Work session completed! Time for a 5-minute break! 🎉');
      } else {
        setPomodoroMode('work');
        setPomodoroTime(25 * 60); // Back to work
        setPomodoroRemaining(25 * 60);
        alert('Break time over! Ready for another work session? 💪');
        setPomodoroActive(false);
      }
    }

    return () => clearInterval(interval);
  }, [pomodoroActive, pomodoroPaused, pomodoroRemaining, pomodoroMode]);

  // Stopwatch Effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (stopwatchActive) {
      interval = setInterval(() => {
        setStopwatchTime(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [stopwatchActive]);

  // Countdown Timer Effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (countdownActive && !countdownPaused && countdownRemaining > 0) {
      interval = setInterval(() => {
        setCountdownRemaining(prev => prev - 1);
      }, 1000);
    } else if (countdownRemaining === 0 && countdownActive) {
      setCountdownActive(false);
      alert('Countdown completed! ⏰');
    }

    return () => clearInterval(interval);
  }, [countdownActive, countdownPaused, countdownRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatCurrentTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatCurrentDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Pomodoro Controls
  const startPomodoro = () => {
    setPomodoroActive(true);
    setPomodoroPaused(false);
  };

  const pausePomodoro = () => {
    setPomodoroPaused(!pomodoroPaused);
  };

  const resetPomodoro = () => {
    setPomodoroActive(false);
    setPomodoroPaused(false);
    setPomodoroMode('work');
    setPomodoroTime(25 * 60);
    setPomodoroRemaining(25 * 60);
  };

  // Stopwatch Controls
  const startStopwatch = () => {
    setStopwatchActive(!stopwatchActive);
  };

  const resetStopwatch = () => {
    setStopwatchActive(false);
    setStopwatchTime(0);
  };

  // Countdown Controls
  const startCountdown = () => {
    if (!countdownActive) {
      const totalSeconds = countdownMinutes * 60 + countdownSeconds;
      setCountdownRemaining(totalSeconds);
    }
    setCountdownActive(true);
    setCountdownPaused(false);
  };

  const pauseCountdown = () => {
    setCountdownPaused(!countdownPaused);
  };

  const resetCountdown = () => {
    setCountdownActive(false);
    setCountdownPaused(false);
    setCountdownRemaining(countdownMinutes * 60 + countdownSeconds);
  };

  // Alarm Controls
  const addAlarm = () => {
    if (newAlarmTime && newAlarmLabel) {
      const newAlarm: Alarm = {
        id: Date.now().toString(),
        time: newAlarmTime,
        label: newAlarmLabel,
        isEnabled: true,
        daysOfWeek: [true, true, true, true, true, true, false] // Default Mon-Sat
      };
      setAlarms([...alarms, newAlarm]);
      setNewAlarmTime('07:00');
      setNewAlarmLabel('');
    }
  };

  const toggleAlarm = (id: string) => {
    setAlarms(alarms.map(alarm => 
      alarm.id === id ? { ...alarm, isEnabled: !alarm.isEnabled } : alarm
    ));
  };

  const deleteAlarm = (id: string) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
          <Timer className="w-8 h-8 mr-3 text-blue-600" />
          Study Timer & Clock
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Manage your study time with Pomodoro technique, stopwatch, countdown timer, and alarms
        </p>
      </div>

      {/* Current Date & Time Display */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Current Time
              </span>
            </div>
            <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">
              {formatCurrentTime(currentTime)}
            </div>
            <div className="text-lg text-slate-600 dark:text-slate-300">
              {formatCurrentDate(currentTime)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="pomodoro" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
          <TabsTrigger value="stopwatch">Stopwatch</TabsTrigger>
          <TabsTrigger value="countdown">Countdown</TabsTrigger>
          <TabsTrigger value="alarms">Alarms</TabsTrigger>
        </TabsList>

        {/* Pomodoro Timer */}
        <TabsContent value="pomodoro">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Timer className="w-5 h-5 mr-2 text-red-600" />
                Pomodoro Timer
              </CardTitle>
              <CardDescription>
                25-minute focused work sessions with 5-minute breaks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    {pomodoroMode === 'work' ? 'Work Session' : 'Break Time'}
                  </div>
                  <div className="text-8xl font-mono font-bold text-slate-900 dark:text-white">
                    {formatTime(pomodoroRemaining)}
                  </div>
                </div>

                <div className="flex justify-center space-x-3">
                  {!pomodoroActive ? (
                    <Button onClick={startPomodoro} size="lg" className="px-8">
                      <Play className="w-5 h-5 mr-2" />
                      Start
                    </Button>
                  ) : (
                    <Button onClick={pausePomodoro} variant="secondary" size="lg" className="px-8">
                      {pomodoroPaused ? (
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
                  )}
                  <Button onClick={resetPomodoro} variant="outline" size="lg" className="px-8">
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reset
                  </Button>
                </div>

                {pomodoroActive && (
                  <div className="text-sm text-muted-foreground">
                    {pomodoroPaused ? 'Paused' : 'Running...'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stopwatch */}
        <TabsContent value="stopwatch">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-green-600" />
                Stopwatch
              </CardTitle>
              <CardDescription>
                Track actual time spent studying each subject
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <div className="text-8xl font-mono font-bold text-slate-900 dark:text-white">
                  {formatTime(stopwatchTime)}
                </div>

                <div className="flex justify-center space-x-3">
                  <Button onClick={startStopwatch} size="lg" className="px-8">
                    {stopwatchActive ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button onClick={resetStopwatch} variant="outline" size="lg" className="px-8">
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reset
                  </Button>
                </div>

                {stopwatchActive && (
                  <div className="text-sm text-green-600 font-medium">
                    Recording time...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Countdown Timer */}
        <TabsContent value="countdown">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Timer className="w-5 h-5 mr-2 text-purple-600" />
                Countdown Timer
              </CardTitle>
              <CardDescription>
                Set a custom countdown for study sessions or breaks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {!countdownActive && (
                  <div className="flex space-x-4 justify-center">
                    <div>
                      <Label htmlFor="minutes">Minutes</Label>
                      <Input
                        id="minutes"
                        type="number"
                        min="0"
                        max="999"
                        value={countdownMinutes}
                        onChange={(e) => setCountdownMinutes(parseInt(e.target.value) || 0)}
                        className="w-20 text-center"
                      />
                    </div>
                    <div>
                      <Label htmlFor="seconds">Seconds</Label>
                      <Input
                        id="seconds"
                        type="number"
                        min="0"
                        max="59"
                        value={countdownSeconds}
                        onChange={(e) => setCountdownSeconds(parseInt(e.target.value) || 0)}
                        className="w-20 text-center"
                      />
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <div className="text-8xl font-mono font-bold text-slate-900 dark:text-white">
                    {formatTime(countdownRemaining)}
                  </div>
                </div>

                <div className="flex justify-center space-x-3">
                  {!countdownActive ? (
                    <Button onClick={startCountdown} size="lg" className="px-8">
                      <Play className="w-5 h-5 mr-2" />
                      Start
                    </Button>
                  ) : (
                    <Button onClick={pauseCountdown} variant="secondary" size="lg" className="px-8">
                      {countdownPaused ? (
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
                  )}
                  <Button onClick={resetCountdown} variant="outline" size="lg" className="px-8">
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reset
                  </Button>
                </div>

                {countdownActive && (
                  <div className="text-center text-sm text-muted-foreground">
                    {countdownPaused ? 'Paused' : 'Counting down...'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alarms */}
        <TabsContent value="alarms">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlarmClock className="w-5 h-5 mr-2 text-orange-600" />
                Study Alarms
              </CardTitle>
              <CardDescription>
                Set wake-up calls and study reminders (6:00-7:00 AM wake-up, 11:00 PM sleep)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add New Alarm */}
              <div className="p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
                <div className="flex space-x-3 items-end">
                  <div>
                    <Label htmlFor="newTime">Time</Label>
                    <Input
                      id="newTime"
                      type="time"
                      value={newAlarmTime}
                      onChange={(e) => setNewAlarmTime(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="newLabel">Label</Label>
                    <Input
                      id="newLabel"
                      placeholder="e.g., Morning Study Session"
                      value={newAlarmLabel}
                      onChange={(e) => setNewAlarmLabel(e.target.value)}
                    />
                  </div>
                  <Button onClick={addAlarm}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Alarm
                  </Button>
                </div>
              </div>

              {/* Existing Alarms */}
              <div className="space-y-3">
                {alarms.map((alarm) => (
                  <div
                    key={alarm.id}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Switch
                        checked={alarm.isEnabled}
                        onCheckedChange={() => toggleAlarm(alarm.id)}
                      />
                      <div>
                        <div className="font-semibold text-lg">
                          {new Date(`2000-01-01T${alarm.time}`).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </div>
                        <div className="text-sm text-muted-foreground">{alarm.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {alarm.daysOfWeek.map((enabled, index) => enabled ? dayNames[index] : null).filter(Boolean).join(', ')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bell className={`w-4 h-4 ${alarm.isEnabled ? 'text-green-600' : 'text-slate-400'}`} />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAlarm(alarm.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}