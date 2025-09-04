"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { 
  Settings, 
  Bell, 
  Shield, 
  Download, 
  Upload,
  Trash2,
  Save,
  Moon,
  Sun,
  Clock,
  Target,
  AlertTriangle
} from 'lucide-react';

export default function SettingsPage() {
  // Notification Settings
  const [notifications, setNotifications] = useState({
    studyReminders: true,
    breakAlerts: true,
    bedtimeWarning: true,
    achievementNotifications: true,
    weeklyReports: true
  });

  // Study Settings  
  const [studySettings, setStudySettings] = useState({
    pomodoroWorkTime: 25,
    pomodoroBreakTime: 5,
    longBreakTime: 15,
    dailyStudyTarget: 4,
    wakeUpTimeStart: '06:00',
    wakeUpTimeEnd: '07:00',
    sleepTimeStart: '23:00',
    sleepTimeEnd: '24:00'
  });

  // Focus Settings
  const [focusSettings, setFocusSettings] = useState({
    enableWebsiteBlocking: true,
    strictMode: false,
    allowEmergencyExit: true,
    emergencyExitCooldown: 5,
    blockedSites: [
      'facebook.com',
      'instagram.com',
      'twitter.com',
      'youtube.com',
      'netflix.com',
      'reddit.com'
    ]
  });

  const [newBlockedSite, setNewBlockedSite] = useState('');
  const [isThemeDark, setIsThemeDark] = useState(false);

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleStudySettingChange = (key: keyof typeof studySettings, value: string | number) => {
    setStudySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const addBlockedSite = () => {
    if (newBlockedSite.trim() && !focusSettings.blockedSites.includes(newBlockedSite.trim())) {
      setFocusSettings(prev => ({
        ...prev,
        blockedSites: [...prev.blockedSites, newBlockedSite.trim()]
      }));
      setNewBlockedSite('');
    }
  };

  const removeBlockedSite = (site: string) => {
    setFocusSettings(prev => ({
      ...prev,
      blockedSites: prev.blockedSites.filter(s => s !== site)
    }));
  };

  const exportData = () => {
    // Simulate data export
    const data = {
      settings: { notifications, studySettings, focusSettings },
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ca-study-hub-settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetAllSettings = () => {
    if (confirm('Are you sure you want to reset all settings? This action cannot be undone.')) {
      // Reset to default values
      setNotifications({
        studyReminders: true,
        breakAlerts: true,
        bedtimeWarning: true,
        achievementNotifications: true,
        weeklyReports: true
      });
      
      setStudySettings({
        pomodoroWorkTime: 25,
        pomodoroBreakTime: 5,
        longBreakTime: 15,
        dailyStudyTarget: 4,
        wakeUpTimeStart: '06:00',
        wakeUpTimeEnd: '07:00',
        sleepTimeStart: '23:00',
        sleepTimeEnd: '24:00'
      });
      
      setFocusSettings({
        enableWebsiteBlocking: true,
        strictMode: false,
        allowEmergencyExit: true,
        emergencyExitCooldown: 5,
        blockedSites: [
          'facebook.com',
          'instagram.com',
          'twitter.com',
          'youtube.com',
          'netflix.com',
          'reddit.com'
        ]
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
          <Settings className="w-8 h-8 mr-3 text-blue-600" />
          App Settings
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Customize your CA Foundation study experience
        </p>
      </div>

      <Tabs defaultValue="study" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="study">Study</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="focus">Focus Mode</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>

        {/* Study Settings */}
        <TabsContent value="study">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Study Schedule
                </CardTitle>
                <CardDescription>
                  Configure your personalized study timings and targets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="wakeUpStart">Wake Up Time (From)</Label>
                    <Input
                      id="wakeUpStart"
                      type="time"
                      value={studySettings.wakeUpTimeStart}
                      onChange={(e) => handleStudySettingChange('wakeUpTimeStart', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="wakeUpEnd">Wake Up Time (To)</Label>
                    <Input
                      id="wakeUpEnd"
                      type="time"
                      value={studySettings.wakeUpTimeEnd}
                      onChange={(e) => handleStudySettingChange('wakeUpTimeEnd', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sleepStart">Sleep Time (From)</Label>
                    <Input
                      id="sleepStart"
                      type="time"
                      value={studySettings.sleepTimeStart}
                      onChange={(e) => handleStudySettingChange('sleepTimeStart', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sleepEnd">Sleep Time (To)</Label>
                    <Input
                      id="sleepEnd"
                      type="time"
                      value={studySettings.sleepTimeEnd}
                      onChange={(e) => handleStudySettingChange('sleepTimeEnd', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="dailyTarget">Daily Study Target (hours)</Label>
                  <Input
                    id="dailyTarget"
                    type="number"
                    min="1"
                    max="12"
                    value={studySettings.dailyStudyTarget}
                    onChange={(e) => handleStudySettingChange('dailyStudyTarget', parseInt(e.target.value) || 4)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-purple-600" />
                  Pomodoro Settings
                </CardTitle>
                <CardDescription>
                  Customize your focus session timings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="workTime">Work Session (minutes)</Label>
                    <Input
                      id="workTime"
                      type="number"
                      min="5"
                      max="60"
                      value={studySettings.pomodoroWorkTime}
                      onChange={(e) => handleStudySettingChange('pomodoroWorkTime', parseInt(e.target.value) || 25)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="breakTime">Short Break (minutes)</Label>
                    <Input
                      id="breakTime"
                      type="number"
                      min="2"
                      max="15"
                      value={studySettings.pomodoroBreakTime}
                      onChange={(e) => handleStudySettingChange('pomodoroBreakTime', parseInt(e.target.value) || 5)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="longBreak">Long Break (minutes)</Label>
                    <Input
                      id="longBreak"
                      type="number"
                      min="10"
                      max="30"
                      value={studySettings.longBreakTime}
                      onChange={(e) => handleStudySettingChange('longBreakTime', parseInt(e.target.value) || 15)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-yellow-600" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Control when and how you receive study reminders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Study Session Reminders</div>
                    <div className="text-sm text-muted-foreground">
                      Get notified when it's time to start studying
                    </div>
                  </div>
                  <Switch
                    checked={notifications.studyReminders}
                    onCheckedChange={() => handleNotificationToggle('studyReminders')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Break Alerts</div>
                    <div className="text-sm text-muted-foreground">
                      Reminders to take breaks during long study sessions
                    </div>
                  </div>
                  <Switch
                    checked={notifications.breakAlerts}
                    onCheckedChange={() => handleNotificationToggle('breakAlerts')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Bedtime Warnings</div>
                    <div className="text-sm text-muted-foreground">
                      Maintain healthy sleep schedule (11:00 PM - 12:00 AM)
                    </div>
                  </div>
                  <Switch
                    checked={notifications.bedtimeWarning}
                    onCheckedChange={() => handleNotificationToggle('bedtimeWarning')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Achievement Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Celebrate your study milestones and achievements
                    </div>
                  </div>
                  <Switch
                    checked={notifications.achievementNotifications}
                    onCheckedChange={() => handleNotificationToggle('achievementNotifications')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Weekly Progress Reports</div>
                    <div className="text-sm text-muted-foreground">
                      Sunday summaries of your week's study progress
                    </div>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={() => handleNotificationToggle('weeklyReports')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Focus Mode Settings */}
        <TabsContent value="focus">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-red-600" />
                  Focus & Distraction Control
                </CardTitle>
                <CardDescription>
                  Configure website blocking and focus mode behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Enable Website Blocking</div>
                    <div className="text-sm text-muted-foreground">
                      Block distracting websites during study sessions
                    </div>
                  </div>
                  <Switch
                    checked={focusSettings.enableWebsiteBlocking}
                    onCheckedChange={(checked) => setFocusSettings(prev => ({
                      ...prev,
                      enableWebsiteBlocking: checked
                    }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Strict Mode</div>
                    <div className="text-sm text-muted-foreground">
                      Prevent app switching during focus sessions
                    </div>
                  </div>
                  <Switch
                    checked={focusSettings.strictMode}
                    onCheckedChange={(checked) => setFocusSettings(prev => ({
                      ...prev,
                      strictMode: checked
                    }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Allow Emergency Exit</div>
                    <div className="text-sm text-muted-foreground">
                      Enable emergency exit for work emergencies
                    </div>
                  </div>
                  <Switch
                    checked={focusSettings.allowEmergencyExit}
                    onCheckedChange={(checked) => setFocusSettings(prev => ({
                      ...prev,
                      allowEmergencyExit: checked
                    }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="cooldown">Emergency Exit Cooldown (minutes)</Label>
                  <Input
                    id="cooldown"
                    type="number"
                    min="1"
                    max="30"
                    value={focusSettings.emergencyExitCooldown}
                    onChange={(e) => setFocusSettings(prev => ({
                      ...prev,
                      emergencyExitCooldown: parseInt(e.target.value) || 5
                    }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blocked Websites</CardTitle>
                <CardDescription>
                  Manage the list of websites to block during focus sessions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add website (e.g., facebook.com)"
                    value={newBlockedSite}
                    onChange={(e) => setNewBlockedSite(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addBlockedSite()}
                  />
                  <Button onClick={addBlockedSite}>Add</Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {focusSettings.blockedSites.map((site) => (
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
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {isThemeDark ? (
                  <Moon className="w-5 h-5 mr-2 text-purple-600" />
                ) : (
                  <Sun className="w-5 h-5 mr-2 text-yellow-600" />
                )}
                Theme & Appearance
              </CardTitle>
              <CardDescription>
                Customize the visual appearance of your study app
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Dark Mode</div>
                  <div className="text-sm text-muted-foreground">
                    Switch between light and dark themes
                  </div>
                </div>
                <Switch
                  checked={isThemeDark}
                  onCheckedChange={setIsThemeDark}
                />
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Theme Preview</h4>
                <div className={`p-3 rounded ${isThemeDark ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'}`}>
                  <div className="text-sm">
                    This is how your app will look with the {isThemeDark ? 'dark' : 'light'} theme.
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Theme changes will be applied immediately</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Management */}
        <TabsContent value="data">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="w-5 h-5 mr-2 text-green-600" />
                  Data Export & Import
                </CardTitle>
                <CardDescription>
                  Backup your settings and study progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-3">
                  <Button onClick={exportData} className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Export Settings
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Settings
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Export includes: study settings, notification preferences, blocked websites, 
                  and app configuration. Study progress data is stored locally.
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700 dark:text-red-400">
                  <Trash2 className="w-5 h-5 mr-2" />
                  Reset Settings
                </CardTitle>
                <CardDescription>
                  Reset all settings to their default values
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="destructive" 
                  onClick={resetAllSettings}
                  className="w-full"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Reset All Settings
                </Button>
                <div className="text-sm text-muted-foreground mt-2">
                  This will reset all your preferences to default values. This action cannot be undone.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Save Changes Button */}
      <div className="fixed bottom-6 right-6">
        <Button size="lg" className="shadow-lg">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>
    </div>
  );
}