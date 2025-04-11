
import React, { useState } from 'react';
import { addDays, format, startOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight, Copy, Clock, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type ShiftType = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  color: string;
  bgColor: string;
};

type EmployeeType = {
  id: string;
  name: string;
  position: string;
  venue: string;
};

type ShiftAssignmentType = {
  id: string;
  employeeId: string;
  date: Date;
  shifts: ShiftType[];
};

// Sample data
const shiftTypes: ShiftType[] = [
  { id: '1', name: '早班', startTime: '07:00', endTime: '15:00', color: 'bg-scheduler-blue', bgColor: 'bg-scheduler-lightBlue' },
  { id: '2', name: '中班', startTime: '15:00', endTime: '23:00', color: 'bg-scheduler-green', bgColor: 'bg-scheduler-lightGreen' },
  { id: '3', name: '晚班', startTime: '23:00', endTime: '07:00', color: 'bg-scheduler-purple', bgColor: 'bg-scheduler-lightPurple' },
  { id: '4', name: '彈性', startTime: '10:00', endTime: '18:00', color: 'bg-scheduler-orange', bgColor: 'bg-scheduler-lightOrange' },
  { id: '5', name: '全天', startTime: '09:00', endTime: '21:00', color: 'bg-scheduler-pink', bgColor: 'bg-scheduler-lightPink' },
];

const employees: EmployeeType[] = [
  { id: '1', name: '王小明', position: '櫃檯主管', venue: '台北館' },
  { id: '2', name: '李小花', position: '櫃檯人員', venue: '台北館' },
  { id: '3', name: '陳大華', position: '房務主管', venue: '台北館' },
  { id: '4', name: '林小玲', position: '房務人員', venue: '新竹館' },
  { id: '5', name: '張小龍', position: '櫃檯人員', venue: '新竹館' },
];

// Generate initial empty shift assignments
const generateInitialShifts = (startDate: Date): ShiftAssignmentType[] => {
  const assignments: ShiftAssignmentType[] = [];
  
  employees.forEach(employee => {
    for (let i = 0; i < 7; i++) {
      const date = addDays(startDate, i);
      assignments.push({
        id: `${employee.id}-${format(date, 'yyyy-MM-dd')}`,
        employeeId: employee.id,
        date,
        shifts: i % 3 === 0 ? [shiftTypes[0]] : i % 3 === 1 ? [shiftTypes[1]] : []
      });
    }
  });
  
  return assignments;
};

const WeeklyScheduler = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start from Monday
  const [shifts, setShifts] = useState(generateInitialShifts(startDate));
  
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));
  
  const previousWeek = () => {
    const newStartDate = addDays(startDate, -7);
    setCurrentDate(newStartDate);
    setShifts(generateInitialShifts(newStartDate));
  };
  
  const nextWeek = () => {
    const newStartDate = addDays(startDate, 7);
    setCurrentDate(newStartDate);
    setShifts(generateInitialShifts(newStartDate));
  };

  const getVenueBadgeColor = (venue: string) => {
    if (venue === '台北館') return 'bg-scheduler-lightBlue text-scheduler-blue';
    if (venue === '新竹館') return 'bg-scheduler-lightGreen text-scheduler-green';
    return 'bg-scheduler-lightGray text-scheduler-gray';
  };
  
  const handleShiftClick = (employeeId: string, date: Date) => {
    // This would open a modal to edit shifts in a real application
    console.log('Edit shifts for:', employeeId, 'on date:', format(date, 'yyyy-MM-dd'));
  };

  return (
    <div className="p-4 sm:p-6">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold">週排班表</h2>
                <span className="text-sm text-gray-500">
                  {format(startDate, 'yyyy/MM/dd')} - {format(addDays(startDate, 6), 'yyyy/MM/dd')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={previousWeek}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={nextWeek}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-1" />
                        複製上週班表
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>複製上一週的所有班表到當前週</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="default" size="sm">
                        <Clock className="h-4 w-4 mr-1" />
                        班別設定
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>設定班別類型和時間</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-left bg-gray-50 rounded-tl-lg font-medium text-gray-500 w-48 sticky left-0 z-10">
                      員工資訊
                    </th>
                    {weekDays.map((day) => (
                      <th key={day.toString()} className="py-3 px-4 text-center bg-gray-50 font-medium text-gray-500 min-w-[140px]">
                        <div>{format(day, 'E')}</div>
                        <div className="text-sm font-normal">{format(day, 'MM/dd')}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id} className="border-t border-gray-100">
                      <td className="py-3 px-4 bg-white sticky left-0 z-10 border-r border-gray-100">
                        <div className="flex flex-col space-y-1">
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-xs text-gray-500">{employee.position}</div>
                          <div className={cn("venue-badge mt-1", getVenueBadgeColor(employee.venue))}>
                            {employee.venue}
                          </div>
                        </div>
                      </td>
                      {weekDays.map((day) => {
                        const dayShifts = shifts.find(
                          s => s.employeeId === employee.id && format(s.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                        );
                        
                        return (
                          <td 
                            key={day.toString()} 
                            className="py-3 px-2 min-h-16 border border-gray-100 align-top"
                            onClick={() => handleShiftClick(employee.id, day)}
                          >
                            <div className="min-h-16 flex flex-col space-y-2">
                              {dayShifts && dayShifts.shifts.length > 0 ? (
                                dayShifts.shifts.map((shift, index) => (
                                  <div 
                                    key={index} 
                                    className={cn("shift-card", shift.color)}
                                  >
                                    <div className="font-medium">{shift.name}</div>
                                    <div className="text-xs mt-1 opacity-90">
                                      {shift.startTime} - {shift.endTime}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="flex items-center justify-center h-full opacity-0 hover:opacity-50 transition-opacity cursor-pointer">
                                  <span className="text-xs text-gray-400">+</span>
                                </div>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between items-center pt-4">
              <div className="flex space-x-4">
                {shiftTypes.slice(0, 4).map((shift) => (
                  <div key={shift.id} className="flex items-center space-x-1">
                    <div className={cn("w-3 h-3 rounded-full", shift.color)} />
                    <span className="text-xs text-gray-600">{shift.name}</span>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" size="sm">
                <UserPlus className="h-4 w-4 mr-1" />
                新增員工
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyScheduler;
