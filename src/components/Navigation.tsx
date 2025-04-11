
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  Clock, 
  UserPlus, 
  Settings, 
  PieChart,
  FileEdit,
  Bell
} from 'lucide-react';

const navigationItems = [
  { name: '週排班表', path: '/', icon: Calendar },
  { name: '班別設定', path: '/shifts', icon: Clock },
  { name: '員工管理', path: '/staff', icon: UserPlus },
  { name: '工時報表', path: '/reports', icon: PieChart },
  { name: '公告通知', path: '/announcements', icon: Bell },
  { name: '系統設定', path: '/settings', icon: Settings },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="flex-shrink-0 bg-white h-full w-64 border-r border-gray-200 p-5">
      <div className="flex flex-col h-full">
        <div className="space-y-1">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              旅宿排班中心
            </h2>
            <p className="text-xs bg-scheduler-lightPurple text-scheduler-purple px-3 py-1.5 rounded-lg inline-block">
              Smart Scheduler for Hospitality
            </p>
          </div>
          
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </div>
        
        <div className="mt-auto pt-6 border-t border-gray-200">
          <Link
            to="/help"
            className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <FileEdit className="mr-3 h-5 w-5 flex-shrink-0" />
            使用說明
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
