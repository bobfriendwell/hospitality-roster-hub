
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';

type ShiftType = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  color: string;
  countHours: boolean;
  note: string;
};

const colorOptions = [
  { value: 'bg-scheduler-blue', label: '藍色' },
  { value: 'bg-scheduler-green', label: '綠色' },
  { value: 'bg-scheduler-orange', label: '橘色' },
  { value: 'bg-scheduler-purple', label: '紫色' },
  { value: 'bg-scheduler-pink', label: '粉色' },
  { value: 'bg-scheduler-yellow', label: '黃色' },
  { value: 'bg-scheduler-teal', label: '青色' },
  { value: 'bg-scheduler-red', label: '紅色' }
];

const initialShifts: ShiftType[] = [
  { id: '1', name: '早班', startTime: '07:00', endTime: '15:00', color: 'bg-scheduler-blue', countHours: true, note: '日常營運班' },
  { id: '2', name: '中班', startTime: '15:00', endTime: '23:00', color: 'bg-scheduler-green', countHours: true, note: '日常營運班' },
  { id: '3', name: '晚班', startTime: '23:00', endTime: '07:00', color: 'bg-scheduler-purple', countHours: true, note: '夜間值班，有夜間津貼' },
  { id: '4', name: '彈性班', startTime: '10:00', endTime: '18:00', color: 'bg-scheduler-orange', countHours: true, note: '旺季支援班' },
  { id: '5', name: '全天班', startTime: '09:00', endTime: '21:00', color: 'bg-scheduler-pink', countHours: true, note: '經理班，中間有休息時間' }
];

const ShiftSettings = () => {
  const [shifts, setShifts] = useState<ShiftType[]>(initialShifts);
  const [editingShift, setEditingShift] = useState<ShiftType | null>(null);
  const [newShift, setNewShift] = useState<ShiftType>({
    id: '',
    name: '',
    startTime: '09:00',
    endTime: '17:00',
    color: 'bg-scheduler-blue',
    countHours: true,
    note: ''
  });

  const handleEdit = (shift: ShiftType) => {
    setEditingShift(shift);
  };

  const handleUpdate = () => {
    if (editingShift) {
      setShifts(shifts.map(s => s.id === editingShift.id ? editingShift : s));
      setEditingShift(null);
    }
  };

  const handleAddNew = () => {
    const id = Date.now().toString();
    const shiftToAdd = { ...newShift, id };
    setShifts([...shifts, shiftToAdd]);
    setNewShift({
      id: '',
      name: '',
      startTime: '09:00',
      endTime: '17:00',
      color: 'bg-scheduler-blue',
      countHours: true,
      note: ''
    });
  };

  const handleDelete = (id: string) => {
    setShifts(shifts.filter(s => s.id !== id));
    if (editingShift && editingShift.id === id) {
      setEditingShift(null);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Shift list */}
        <div className="md:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>班別設定</CardTitle>
              <CardDescription>管理您的班別設定，包含班別名稱、時間、顏色等</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shifts.map(shift => (
                  <div 
                    key={shift.id} 
                    className={cn(
                      "p-4 rounded-lg border border-gray-200 flex justify-between items-center",
                      editingShift?.id === shift.id ? "bg-blue-50 border-blue-200" : ""
                    )}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={cn("w-8 h-8 rounded-md flex-shrink-0", shift.color)}></div>
                      <div>
                        <h3 className="font-medium">{shift.name}</h3>
                        <p className="text-sm text-gray-500">
                          {shift.startTime} - {shift.endTime}
                          {shift.countHours && " (計入工時)"}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEdit(shift)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(shift.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Add/Edit form */}
        <div>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>{editingShift ? '編輯班別' : '新增班別'}</CardTitle>
              <CardDescription>
                {editingShift ? '修改現有班別的設定' : '建立新的班別設定'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">班別名稱</Label>
                <Input
                  id="name"
                  value={editingShift ? editingShift.name : newShift.name}
                  onChange={(e) => {
                    if (editingShift) {
                      setEditingShift({ ...editingShift, name: e.target.value });
                    } else {
                      setNewShift({ ...newShift, name: e.target.value });
                    }
                  }}
                  placeholder="例如：早班、晚班"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">開始時間</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={editingShift ? editingShift.startTime : newShift.startTime}
                    onChange={(e) => {
                      if (editingShift) {
                        setEditingShift({ ...editingShift, startTime: e.target.value });
                      } else {
                        setNewShift({ ...newShift, startTime: e.target.value });
                      }
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">結束時間</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={editingShift ? editingShift.endTime : newShift.endTime}
                    onChange={(e) => {
                      if (editingShift) {
                        setEditingShift({ ...editingShift, endTime: e.target.value });
                      } else {
                        setNewShift({ ...newShift, endTime: e.target.value });
                      }
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>顏色</Label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map(color => (
                    <div
                      key={color.value}
                      className={cn(
                        "w-full h-8 rounded-md cursor-pointer border-2",
                        color.value,
                        (editingShift ? editingShift.color === color.value : newShift.color === color.value)
                          ? "border-gray-800"
                          : "border-transparent"
                      )}
                      onClick={() => {
                        if (editingShift) {
                          setEditingShift({ ...editingShift, color: color.value });
                        } else {
                          setNewShift({ ...newShift, color: color.value });
                        }
                      }}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="countHours"
                  checked={editingShift ? editingShift.countHours : newShift.countHours}
                  onCheckedChange={(checked) => {
                    if (editingShift) {
                      setEditingShift({ ...editingShift, countHours: checked });
                    } else {
                      setNewShift({ ...newShift, countHours: checked });
                    }
                  }}
                />
                <Label htmlFor="countHours">計入工時統計</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">備註</Label>
                <Textarea
                  id="note"
                  value={editingShift ? editingShift.note : newShift.note}
                  onChange={(e) => {
                    if (editingShift) {
                      setEditingShift({ ...editingShift, note: e.target.value });
                    } else {
                      setNewShift({ ...newShift, note: e.target.value });
                    }
                  }}
                  placeholder="班別說明、用途、限制等"
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter>
              {editingShift ? (
                <div className="flex space-x-2 w-full">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setEditingShift(null)}
                  >
                    取消
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={handleUpdate}
                  >
                    儲存變更
                  </Button>
                </div>
              ) : (
                <Button 
                  className="w-full" 
                  onClick={handleAddNew}
                  disabled={!newShift.name}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  新增班別
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShiftSettings;
