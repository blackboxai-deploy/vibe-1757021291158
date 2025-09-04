"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Home, 
  Target, 
  Timer, 
  Calendar, 
  TrendingUp, 
  Settings, 
  Menu,
  Clock,
  BookOpen
} from 'lucide-react';

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Home,
    description: 'Overview and quick actions'
  },
  {
    title: 'Focus Mode',
    href: '/focus',
    icon: Target,
    description: 'Distraction-free study sessions'
  },
  {
    title: 'Study Timer',
    href: '/timer',
    icon: Timer,
    description: 'Pomodoro, stopwatch & alarms'
  },
  {
    title: 'Timetable',
    href: '/timetable',
    icon: Calendar,
    description: 'Your personalized schedule'
  },
  {
    title: 'Progress',
    href: '/progress',
    icon: TrendingUp,
    description: 'Track your study progress'
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'App configuration'
  }
];

interface NavigationProps {
  className?: string;
}

function NavigationContent({ className }: NavigationProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Logo/Brand */}
      <div className="p-6 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">CA Study Hub</h2>
            <p className="text-xs text-muted-foreground">Foundation Success</p>
          </div>
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                  )}
                >
                  <IconComponent className="w-4 h-4" />
                  <div className="flex-1">
                    <div>{item.title}</div>
                    <div className={cn(
                      "text-xs",
                      isActive ? "text-blue-700 dark:text-blue-300" : "text-gray-500 dark:text-gray-400"
                    )}>
                      {item.description}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Current Time Display */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <aside className="hidden lg:flex w-64 border-r bg-card">
        <NavigationContent />
      </aside>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-40 lg:hidden"
            >
              <Menu className="w-5 h-5" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <NavigationContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}