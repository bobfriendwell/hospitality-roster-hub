
import React, { useState, useRef, useCallback } from 'react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Calendar as CalendarIcon, 
  Download, 
  Users, 
  BarChart3,
  Upload,
  Link as LinkIcon
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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

// Updated data to include totalWorkHours for each day
const defaultOccupancyData = [
  { date: '4/1', occupancy: 78, taipei: 82, hsinchu: 72, totalWorkHours: 120 },
  { date: '4/2', occupancy: 82, taipei: 85, hsinchu: 78, totalWorkHours: 132 },
  { date: '4/3', occupancy: 76, taipei: 80, hsinchu: 70, totalWorkHours: 124 },
  { date: '4/4', occupancy: 85, taipei: 88, hsinchu: 81, totalWorkHours: 136 },
  { date: '4/5', occupancy: 92, taipei: 95, hsinchu: 88, totalWorkHours: 152 },
  { date: '4/6', occupancy: 96, taipei: 98, hsinchu: 93, totalWorkHours: 160 },
  { date: '4/7', occupancy: 94, taipei: 95, hsinchu: 92, totalWorkHours: 156 },
  { date: '4/8', occupancy: 88, taipei: 90, hsinchu: 85, totalWorkHours: 144 },
  { date: '4/9', occupancy: 84, taipei: 86, hsinchu: 81, totalWorkHours: 136 },
  { date: '4/10', occupancy: 80, taipei: 83, hsinchu: 76, totalWorkHours: 128 },
  { date: '4/11', occupancy: 83, taipei: 85, hsinchu: 80, totalWorkHours: 132 },
  { date: '4/12', occupancy: 89, taipei: 92, hsinchu: 85, totalWorkHours: 144 },
  { date: '4/13', occupancy: 94, taipei: 97, hsinchu: 90, totalWorkHours: 152 },
  { date: '4/14', occupancy: 92, taipei: 95, hsinchu: 88, totalWorkHours: 148 },
];

const COLORS = ['#9b87f5', '#4eaaed', '#52d7b7', '#f5b455'];

const ReportsPage = () => {
  const [period, setPeriod] = useState('month');
  const [occupancyData, setOccupancyData] = useState(defaultOccupancyData);
  const [isUploading, setIsUploading] = useState(false);
  const [apiUrl, setApiUrl] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const lines = csv.split('\n');
        const headers = lines[0].split(',');
        
        // Validate CSV format
        const expectedHeaders = ['date', 'occupancy', 'taipei', 'hsinchu', 'totalWorkHours'];
        const allHeadersPresent = expectedHeaders.every(header => 
          headers.map(h => h.trim().toLowerCase()).includes(header.toLowerCase())
        );

        if (!allHeadersPresent) {
          throw new Error('CSV格式不正確，必須包含 date, occupancy, taipei, hsinchu, totalWorkHours 欄位');
        }

        // 將CSV轉換成數據格式
        const newData = [];
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === '') continue; // 跳過空行
          
          const values = lines[i].split(',');
          const row: any = {};
          
          headers.forEach((header, index) => {
            const trimmedHeader = header.trim();
            const value = values[index]?.trim() || '';
            
            if (trimmedHeader === 'date') {
              row[trimmedHeader] = value;
            } else {
              // 轉換數值欄位
              row[trimmedHeader] = parseFloat(value) || 0;
            }
          });
          
          newData.push(row);
        }

        setOccupancyData(newData);
        toast({
          title: "匯入成功",
          description: `已成功匯入 ${newData.length} 筆資料`,
        });
      } catch (error) {
        toast({
          title: "匯入失敗",
          description: error instanceof Error ? error.message : "CSV格式不正確",
          variant: "destructive"
        });
      } finally {
        setIsUploading(false);
        // 重置 file input
        if (inputRef.current) inputRef.current.value = '';
      }
    };

    reader.onerror = () => {
      toast({
        title: "匯入失敗",
        description: "無法讀取檔案",
        variant: "destructive"
      });
      setIsUploading(false);
    };

    reader.readAsText(file);
  };

  const handleApiImport = useCallback(async () => {
    if (!apiUrl) {
      toast({
        title: "API 網址錯誤",
        description: "請輸入有效的 API 網址",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`API 請求失敗: ${response.status}`);
      }

      const data = await response.json();
      
      // 驗證API返回的數據格式
      if (!Array.isArray(data)) {
        throw new Error('API 返回的數據不是陣列格式');
      }

      const validData = data.filter(item => 
        item.date && 
        typeof item.occupancy === 'number' && 
        typeof item.taipei === 'number' && 
        typeof item.hsinchu === 'number' && 
        typeof item.totalWorkHours === 'number'
      );

      if (validData.length === 0) {
        throw new Error('API 返回的數據格式不正確');
      }

      setOccupancyData(validData);
      toast({
        title: "API 匯入成功",
        description: `已成功匯入 ${validData.length} 筆資料`,
      });
    } catch (error) {
      toast({
        title: "API 匯入失敗",
        description: error instanceof Error ? error.message : "無法從 API 獲取數據",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  }, [apiUrl, toast]);

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
            <TabsTrigger value="import">資料匯入</TabsTrigger>
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
                  <CardDescription>近14日住房率與總工時對比</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer
                      config={{
                        "occupancy": { color: "#9b87f5" },
                        "taipei": { color: "#4eaaed" },
                        "hsinchu": { color: "#52d7b7" },
                        "totalWorkHours": { color: "#f5b455" },
                      }}
                    >
                      <LineChart data={occupancyData.slice(0, 11)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis 
                          yAxisId="left" 
                          orientation="left" 
                          domain={[0, 100]} 
                          label={{ value: '住房率 (%)', angle: -90, position: 'insideLeft' }} 
                        />
                        <YAxis 
                          yAxisId="right" 
                          orientation="right" 
                          domain={[0, 200]} 
                          label={{ value: '總工時 (小時)', angle: 90, position: 'insideRight' }} 
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="occupancy"
                          name="整體住房率"
                          stroke="#9b87f5"
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                        <Line 
                          yAxisId="left" 
                          type="monotone" 
                          dataKey="taipei" 
                          name="台北館" 
                          stroke="#4eaaed" 
                        />
                        <Line 
                          yAxisId="left" 
                          type="monotone" 
                          dataKey="hsinchu" 
                          name="新竹館" 
                          stroke="#52d7b7" 
                        />
                        <Bar 
                          yAxisId="right" 
                          dataKey="totalWorkHours" 
                          name="總工時" 
                          fill="#f5b455" 
                          barSize={20} 
                        />
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
                <CardDescription>住房率與總工時效率對比 (4/1~4/11)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ChartContainer
                    config={{
                      "occupancy": { color: "#9b87f5" },
                      "taipei": { color: "#4eaaed" },
                      "hsinchu": { color: "#52d7b7" },
                      "totalWorkHours": { color: "#f5b455" },
                    }}
                  >
                    <LineChart data={occupancyData.slice(0, 11)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis 
                        yAxisId="left" 
                        orientation="left" 
                        domain={[0, 100]} 
                        label={{ value: '住房率 (%)', angle: -90, position: 'insideLeft' }} 
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        domain={[0, 200]} 
                        label={{ value: '總工時 (小時)', angle: 90, position: 'insideRight' }} 
                      />
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
                        yAxisId="left"
                        type="monotone"
                        dataKey="taipei"
                        name="台北館"
                        stroke="#4eaaed"
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="hsinchu"
                        name="新竹館"
                        stroke="#52d7b7"
                      />
                      <Bar 
                        yAxisId="right" 
                        dataKey="totalWorkHours" 
                        name="總工時" 
                        fill="#f5b455" 
                        barSize={20} 
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="import" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    CSV 檔案匯入
                  </CardTitle>
                  <CardDescription>上傳 CSV 格式的住房率資料</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="csvFile">選擇 CSV 檔案</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          ref={inputRef}
                          id="csvFile"
                          type="file"
                          accept=".csv"
                          onChange={handleFileUpload}
                          disabled={isUploading}
                          className="flex-1"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        CSV 格式必須包含 date, occupancy, taipei, hsinchu, totalWorkHours 欄位
                      </p>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-md">
                      <h4 className="font-medium mb-2">CSV 格式範例</h4>
                      <pre className="text-xs overflow-auto p-2 bg-background rounded border">
                        date,occupancy,taipei,hsinchu,totalWorkHours<br/>
                        4/1,78,82,72,120<br/>
                        4/2,82,85,78,132<br/>
                        4/3,76,80,70,124<br/>
                        ...
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LinkIcon className="h-5 w-5 mr-2" />
                    API 串接
                  </CardTitle>
                  <CardDescription>從 API 端點匯入住房率資料</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="apiUrl">API 網址</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="apiUrl"
                          placeholder="https://example.com/api/occupancy-data"
                          value={apiUrl}
                          onChange={(e) => setApiUrl(e.target.value)}
                          disabled={isUploading}
                          className="flex-1"
                        />
                        <Button 
                          onClick={handleApiImport} 
                          disabled={isUploading || !apiUrl}
                        >
                          匯入
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        API 回傳資料必須是 JSON 陣列，每個項目必須包含 date, occupancy, taipei, hsinchu, totalWorkHours 屬性
                      </p>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-md">
                      <h4 className="font-medium mb-2">API 回傳格式範例</h4>
                      <pre className="text-xs overflow-auto p-2 bg-background rounded border">
                        {`[
  {
    "date": "4/1",
    "occupancy": 78,
    "taipei": 82,
    "hsinchu": 72,
    "totalWorkHours": 120
  },
  {
    "date": "4/2",
    "occupancy": 82,
    "taipei": 85,
    "hsinchu": 78,
    "totalWorkHours": 132
  },
  ...
]`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReportsPage;

