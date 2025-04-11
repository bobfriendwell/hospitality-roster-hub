
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { 
  Calendar as CalendarIcon, 
  Download, 
  Users, 
  BarChart3
} from 'lucide-react';

// Sample data
const workHoursData = [
  { name: '王小明', hours: 160, overtime: 8, venue: '台北館' },
  { name: '李小花', hours: 152, overtime: 0, venue: '台北館' },
  { name: '陳大華', hours: 168, overtime: 12, venue: '台北館' },
  { name: '林小玲', hours: 144, overtime: 4, venue: '新竹館' },
  { name: '張小龍', hours: 136, overtime: 0, venue: '新竹館' },
];

const departmentData = [
  { name: '櫃檯', value: 304 },
  { name: '房務', value: 456 },
  { name: '餐飲', value: 240 },
  { name: '管理', value: 120 },
];

const occupancyData = [
  { date: '4/1', occupancy: 78, taipei: 82, hsinchu: 72 },
  { date: '4/2', occupancy: 82, taipei: 85, hsinchu: 78 },
  { date: '4/3', occupancy: 76, taipei: 80, hsinchu: 70 },
  { date: '4/4', occupancy: 85, taipei: 88, hsinchu: 81 },
  { date: '4/5', occupancy: 92, taipei: 95, hsinchu: 88 },
  { date: '4/6', occupancy: 96, taipei: 98, hsinchu: 93 },
  { date: '4/7', occupancy: 94, taipei: 95, hsinchu: 92 },
  { date: '4/8', occupancy: 88, taipei: 90, hsinchu: 85 },
  { date: '4/9', occupancy: 84, taipei: 86, hsinchu: 81 },
  { date: '4/10', occupancy: 80, taipei: 83, hsinchu: 76 },
  { date: '4/11', occupancy: 83, taipei: 85, hsinchu: 80 },
  { date: '4/12', occupancy: 89, taipei: 92, hsinchu: 85 },
  { date: '4/13', occupancy: 94, taipei: 97, hsinchu: 90 },
  { date: '4/14', occupancy: 92, taipei: 95, hsinchu: 88 },
];

const COLORS = ['#9b87f5', '#4eaaed', '#52d7b7', '#f5b455'];

const ReportsPage = () => {
  const [period, setPeriod] = useState('month');

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">工時報表</h1>
            <p className="text-gray-500">查看員工工時與住房率數據分析</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <CalendarIcon className="h-4 w-4 mr-2" />
              選擇日期
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              匯出報表
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">總覽</TabsTrigger>
            <TabsTrigger value="workHours">工時統計</TabsTrigger>
            <TabsTrigger value="occupancy">住房率分析</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    員工工時分佈
                  </CardTitle>
                  <CardDescription>各部門工時佔比</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer
                      config={{
                        "櫃檯": { color: COLORS[0] },
                        "房務": { color: COLORS[1] },
                        "餐飲": { color: COLORS[2] },
                        "管理": { color: COLORS[3] },
                      }}
                    >
                      <PieChart>
                        <Pie
                          data={departmentData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {departmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    住房率與人力配置
                  </CardTitle>
                  <CardDescription>近14日住房率趨勢</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer
                      config={{
                        "occupancy": { color: "#9b87f5" },
                        "taipei": { color: "#4eaaed" },
                        "hsinchu": { color: "#52d7b7" },
                      }}
                    >
                      <LineChart data={occupancyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="occupancy"
                          name="整體住房率"
                          stroke="#9b87f5"
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                        <Line type="monotone" dataKey="taipei" name="台北館" stroke="#4eaaed" />
                        <Line type="monotone" dataKey="hsinchu" name="新竹館" stroke="#52d7b7" />
                      </LineChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="workHours" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>員工個人工時統計</CardTitle>
                <CardDescription>各員工標準工時與加班時數</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ChartContainer
                    config={{
                      "hours": { color: "#9b87f5" },
                      "overtime": { color: "#f5b455" },
                    }}
                  >
                    <BarChart
                      data={workHoursData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="hours" name="標準工時" stackId="a" fill="#9b87f5" />
                      <Bar dataKey="overtime" name="加班時數" stackId="a" fill="#f5b455" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="occupancy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>住房率與人力配置分析</CardTitle>
                <CardDescription>住房率與排班人力對比</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ChartContainer
                    config={{
                      "occupancy": { color: "#9b87f5" },
                      "taipei": { color: "#4eaaed" },
                      "hsinchu": { color: "#52d7b7" },
                    }}
                  >
                    <LineChart data={occupancyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="occupancy"
                        name="整體住房率"
                        stroke="#9b87f5"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="taipei"
                        name="台北館"
                        stroke="#4eaaed"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="hsinchu"
                        name="新竹館"
                        stroke="#52d7b7"
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReportsPage;
