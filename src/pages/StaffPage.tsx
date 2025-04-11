
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Search,
  UserPlus,
  Edit,
  Trash2,
  Filter,
  CheckCircle,
  XCircle,
  Calendar,
  Clock
} from 'lucide-react';

// Sample data
const staffData = [
  { id: '1', name: '王小明', position: '櫃檯主管', venue: '台北館', phone: '0912-345-678', email: 'wang@example.com', status: 'active', shifts: ['早班', '中班'] },
  { id: '2', name: '李小花', position: '櫃檯人員', venue: '台北館', phone: '0923-456-789', email: 'lee@example.com', status: 'active', shifts: ['早班', '中班'] },
  { id: '3', name: '陳大華', position: '房務主管', venue: '台北館', phone: '0934-567-890', email: 'chen@example.com', status: 'active', shifts: ['中班', '晚班'] },
  { id: '4', name: '林小玲', position: '房務人員', venue: '新竹館', phone: '0945-678-901', email: 'lin@example.com', status: 'vacation', shifts: ['早班', '全天'] },
  { id: '5', name: '張小龍', position: '櫃檯人員', venue: '新竹館', phone: '0956-789-012', email: 'zhang@example.com', status: 'active', shifts: ['早班', '彈性'] },
  { id: '6', name: '黃小芸', position: '餐飲人員', venue: '台北館', phone: '0967-890-123', email: 'huang@example.com', status: 'leave', shifts: ['彈性'] },
  { id: '7', name: '劉小菁', position: '房務人員', venue: '新竹館', phone: '0978-901-234', email: 'liu@example.com', status: 'active', shifts: ['中班', '晚班'] },
];

const positions = ['櫃檯主管', '櫃檯人員', '房務主管', '房務人員', '餐飲主管', '餐飲人員', '管理人員'];
const venues = ['台北館', '新竹館'];
const shifts = ['早班', '中班', '晚班', '彈性', '全天'];

const StaffPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');

  const filteredStaff = staffData.filter(staff => {
    const matchSearch = staff.name.includes(searchTerm) || 
                       staff.position.includes(searchTerm) || 
                       staff.email.includes(searchTerm);
    
    const matchVenue = selectedVenue === 'all' || staff.venue === selectedVenue;
    const matchPosition = selectedPosition === 'all' || staff.position === selectedPosition;
    
    return matchSearch && matchVenue && matchPosition;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">在職中</Badge>;
      case 'vacation':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">休假中</Badge>;
      case 'leave':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">請假中</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">員工管理</h1>
            <p className="text-gray-500">管理所有員工資料、班別和休假設定</p>
          </div>
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                新增員工
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>新增員工</DialogTitle>
                <DialogDescription>
                  填寫新員工基本資料。新增後將可指派班別及設定權限。
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    姓名
                  </Label>
                  <Input id="name" className="col-span-3" placeholder="請輸入員工全名" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="position" className="text-right">
                    職位
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="選擇職位" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map(position => (
                        <SelectItem key={position} value={position}>
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="venue" className="text-right">
                    館別
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="選擇館別" />
                    </SelectTrigger>
                    <SelectContent>
                      {venues.map(venue => (
                        <SelectItem key={venue} value={venue}>
                          {venue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    電話
                  </Label>
                  <Input id="phone" className="col-span-3" placeholder="09xx-xxx-xxx" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" className="col-span-3" type="email" placeholder="example@mail.com" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
                  取消
                </Button>
                <Button onClick={() => setOpenAddDialog(false)}>
                  新增員工
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">所有員工</TabsTrigger>
            <TabsTrigger value="taipei">台北館</TabsTrigger>
            <TabsTrigger value="hsinchu">新竹館</TabsTrigger>
          </TabsList>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="搜尋員工..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="館別" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有館別</SelectItem>
                      {venues.map(venue => (
                        <SelectItem key={venue} value={venue}>{venue}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="職位" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有職位</SelectItem>
                      {positions.map(position => (
                        <SelectItem key={position} value={position}>{position}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>姓名</TableHead>
                    <TableHead>職位</TableHead>
                    <TableHead>館別</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead>可排班別</TableHead>
                    <TableHead>聯絡方式</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.position}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">
                          {staff.venue}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(staff.status)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {staff.shifts.map((shift) => (
                            <Badge key={shift} variant="secondary" className="font-normal">
                              {shift}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{staff.phone}</div>
                          <div className="text-gray-500">{staff.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Calendar className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Clock className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">
                顯示 {filteredStaff.length} 位員工（共 {staffData.length} 位）
              </div>
              <Button variant="outline" size="sm">
                檢視更多
              </Button>
            </CardFooter>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default StaffPage;
