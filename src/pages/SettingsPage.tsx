
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Settings,
  Building,
  Bell,
  Mail,
  Calendar,
  Lock,
  Users,
  Database,
  Cloud,
  Smartphone,
  Save,
  CheckCircle,
  XCircle
} from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-2xl font-bold">系統設定</h1>
          <p className="text-gray-500">管理系統基本設定、通知及權限</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="sm:w-60 flex-shrink-0">
              <TabsList className="flex flex-col h-auto p-0 bg-transparent gap-1">
                <TabsTrigger 
                  value="general" 
                  className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  基本設定
                </TabsTrigger>
                <TabsTrigger 
                  value="company" 
                  className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
                >
                  <Building className="h-4 w-4 mr-2" />
                  旅宿資訊
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  通知設定
                </TabsTrigger>
                <TabsTrigger 
                  value="permissions" 
                  className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  權限管理
                </TabsTrigger>
                <TabsTrigger 
                  value="integrations" 
                  className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
                >
                  <Cloud className="h-4 w-4 mr-2" />
                  整合服務
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="flex-1">
              <TabsContent value="general" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>基本設定</CardTitle>
                    <CardDescription>
                      管理系統的基本顯示與操作設定
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">系統語言</Label>
                        <Select defaultValue="zh-TW">
                          <SelectTrigger>
                            <SelectValue placeholder="選擇語言" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="zh-TW">繁體中文</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="ja">日本語</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timezone">時區設定</Label>
                        <Select defaultValue="Asia/Taipei">
                          <SelectTrigger>
                            <SelectValue placeholder="選擇時區" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Asia/Taipei">台北 (GMT+8)</SelectItem>
                            <SelectItem value="Asia/Tokyo">東京 (GMT+9)</SelectItem>
                            <SelectItem value="America/Los_Angeles">洛杉磯 (GMT-8)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dateFormat">日期格式</Label>
                        <Select defaultValue="yyyy/MM/dd">
                          <SelectTrigger>
                            <SelectValue placeholder="選擇日期格式" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yyyy/MM/dd">YYYY/MM/DD</SelectItem>
                            <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>深色模式</Label>
                          <p className="text-sm text-muted-foreground">
                            切換系統外觀為深色模式
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>自動儲存</Label>
                          <p className="text-sm text-muted-foreground">
                            編輯班表時自動儲存變更
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>顯示週末</Label>
                          <p className="text-sm text-muted-foreground">
                            在排班表中特別標示週末日期
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      儲存設定
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="company" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>旅宿資訊</CardTitle>
                    <CardDescription>
                      管理旅宿基本資料與館別設定
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">旅宿名稱</Label>
                        <Input id="companyName" defaultValue="好客旅店集團" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="businessNumber">統一編號</Label>
                        <Input id="businessNumber" defaultValue="12345678" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson">負責人</Label>
                        <Input id="contactPerson" defaultValue="張大方" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">聯絡電話</Label>
                        <Input id="contactPhone" defaultValue="02-1234-5678" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">聯絡Email</Label>
                        <Input id="contactEmail" type="email" defaultValue="contact@goodhotel.com" />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label>館別管理</Label>
                          <Button variant="outline" size="sm">
                            <Building className="h-4 w-4 mr-2" />
                            新增館別
                          </Button>
                        </div>
                        <div className="space-y-2 pt-2">
                          <div className="flex justify-between items-center p-3 border rounded-md">
                            <div>
                              <div className="font-medium">台北館</div>
                              <div className="text-sm text-gray-500">台北市中山區南京東路</div>
                            </div>
                            <Button variant="ghost" size="sm">編輯</Button>
                          </div>
                          <div className="flex justify-between items-center p-3 border rounded-md">
                            <div>
                              <div className="font-medium">新竹館</div>
                              <div className="text-sm text-gray-500">新竹市東區光復路</div>
                            </div>
                            <Button variant="ghost" size="sm">編輯</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      儲存設定
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>通知設定</CardTitle>
                    <CardDescription>
                      管理系統通知方式與時間
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Email通知</div>
                          <p className="text-sm text-muted-foreground">
                            透過Email發送班表更新及系統通知
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">LINE通知</div>
                          <p className="text-sm text-muted-foreground">
                            透過LINE發送即時通知與提醒
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">APP推播</div>
                          <p className="text-sm text-muted-foreground">
                            透過手機APP推播即時通知
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <Label>通知時間設定</Label>
                        <div className="grid gap-4">
                          <div className="flex justify-between items-center p-3 border rounded-md">
                            <div className="flex items-center gap-3">
                              <Calendar className="h-5 w-5 text-primary" />
                              <div>
                                <div className="font-medium">班表發布通知</div>
                                <div className="text-sm text-gray-500">當新班表發布時通知員工</div>
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex justify-between items-center p-3 border rounded-md">
                            <div className="flex items-center gap-3">
                              <Bell className="h-5 w-5 text-primary" />
                              <div>
                                <div className="font-medium">班前提醒</div>
                                <div className="text-sm text-gray-500">在上班前24小時發送提醒</div>
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex justify-between items-center p-3 border rounded-md">
                            <div className="flex items-center gap-3">
                              <Users className="h-5 w-5 text-primary" />
                              <div>
                                <div className="font-medium">換班申請通知</div>
                                <div className="text-sm text-gray-500">當有換班申請時通知管理員</div>
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      儲存設定
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="permissions" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>權限管理</CardTitle>
                    <CardDescription>
                      設定不同角色的系統權限
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>角色權限設定</Label>
                        <div className="space-y-3">
                          <div className="p-4 border rounded-md">
                            <div className="flex justify-between items-center mb-3">
                              <div className="font-semibold">系統管理員</div>
                              <Button variant="outline" size="sm">編輯</Button>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-sm">
                                <span>檢視所有班表</span>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span>編輯所有班表</span>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span>管理員工資料</span>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span>設定系統參數</span>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 border rounded-md">
                            <div className="flex justify-between items-center mb-3">
                              <div className="font-semibold">排班主管</div>
                              <Button variant="outline" size="sm">編輯</Button>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-sm">
                                <span>檢視所有班表</span>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span>編輯所有班表</span>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span>管理員工資料</span>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span>設定系統參數</span>
                                <XCircle className="h-4 w-4 text-red-500" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 border rounded-md">
                            <div className="flex justify-between items-center mb-3">
                              <div className="font-semibold">一般員工</div>
                              <Button variant="outline" size="sm">編輯</Button>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-sm">
                                <span>檢視所有班表</span>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span>編輯所有班表</span>
                                <XCircle className="h-4 w-4 text-red-500" />
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span>管理員工資料</span>
                                <XCircle className="h-4 w-4 text-red-500" />
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span>設定系統參數</span>
                                <XCircle className="h-4 w-4 text-red-500" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <Button variant="outline">
                          <Users className="h-4 w-4 mr-2" />
                          新增角色
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      儲存設定
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="integrations" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>整合服務</CardTitle>
                    <CardDescription>
                      設定與第三方服務的整合
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-[#4285F4]/10">
                            <Calendar className="h-5 w-5 text-[#4285F4]" />
                          </div>
                          <div>
                            <div className="font-medium">Google Calendar</div>
                            <div className="text-sm text-gray-500">將排班同步至Google日曆</div>
                          </div>
                        </div>
                        <Button variant="outline">連結</Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-[#00c300]/10">
                            <Smartphone className="h-5 w-5 text-[#00c300]" />
                          </div>
                          <div>
                            <div className="font-medium">LINE Notify</div>
                            <div className="text-sm text-gray-500">透過LINE發送班表通知</div>
                          </div>
                        </div>
                        <Button variant="outline">連結</Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-[#3f87ff]/10">
                            <Database className="h-5 w-5 text-[#3f87ff]" />
                          </div>
                          <div>
                            <div className="font-medium">PMS系統整合</div>
                            <div className="text-sm text-gray-500">與旅館管理系統整合</div>
                          </div>
                        </div>
                        <Button variant="outline">連結</Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-[#0078d4]/10">
                            <Mail className="h-5 w-5 text-[#0078d4]" />
                          </div>
                          <div>
                            <div className="font-medium">Email通知服務</div>
                            <div className="text-sm text-gray-500">設定Email發送服務</div>
                          </div>
                        </div>
                        <Button variant="outline">設定</Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      儲存設定
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
