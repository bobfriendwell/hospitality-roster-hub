
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  FileText, 
  Settings, 
  Users, 
  Bell, 
  Menu 
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-3 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Navigation />
          </SheetContent>
        </Sheet>
        
        <h1 className="text-xl font-bold text-gray-800 ml-2">
          旅宿排班中心
        </h1>
        <span className="text-xs bg-scheduler-lightPurple text-scheduler-purple px-2 py-1 rounded-full ml-2 hidden sm:inline-block">
          Smart Scheduler for Hospitality
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        <Button variant="ghost" size="sm" className="hidden sm:flex">
          <FileText className="h-4 w-4 mr-1" />
          匯出
        </Button>
        <Button variant="default" size="sm">
          <Calendar className="h-4 w-4 mr-1" />
          一週表
        </Button>
      </div>
    </header>
  );
};

export default Header;
