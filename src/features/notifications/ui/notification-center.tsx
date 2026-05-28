'use client';

import * as React from 'react';
import { Bell, MessageSquare, Settings, MoreHorizontal, CheckCircle2, Sparkles, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { cn } from '@/shared/lib/utils';

interface Notification {
  id: string;
  type: 'learning' | 'talent' | 'system';
  title: string;
  content: string;
  time: string;
  isRead: boolean;
  icon?: React.ReactNode;
  image?: string;
}

interface ChatMessage {
  id: string;
  sender: {
    name: string;
    avatar?: string;
    role: 'child' | 'parent';
  };
  lastMessage: string;
  time: string;
  unreadCount: number;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'talent',
    title: '새로운 재능 발견!',
    content: '지우가 수학 논리 영역에서 놀라운 집중력을 보였어요. 새로운 재능 리포트를 확인해보세요.',
    time: '방금 전',
    isRead: false,
    icon: <Sparkles className="h-4 w-4 text-purple-500" />,
  },
  {
    id: '2',
    type: 'learning',
    title: '학습 완료',
    content: '민준이가 [기초 코딩 - 파이썬 기초] 단원을 100점으로 완료했습니다.',
    time: '2시간 전',
    isRead: false,
    icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  },
  {
    id: '3',
    type: 'system',
    title: '정기 업데이트 안내',
    content: '부모님들을 위한 새로운 교육 가이드가 업데이트 되었습니다.',
    time: '어제',
    isRead: true,
  },
];

const CHATS: ChatMessage[] = [
  {
    id: '1',
    sender: { name: '김지우', role: 'child' },
    lastMessage: '엄마, 오늘 코딩 숙제 다 했어요! 칭찬 스티커 주세요 ㅎㅎ',
    time: '오후 2:30',
    unreadCount: 1,
  },
  {
    id: '2',
    sender: { name: '김민준', role: 'child' },
    lastMessage: '아빠, 수학 문제 너무 어려워요 ㅠㅠ 도와주세요!',
    time: '오전 11:15',
    unreadCount: 0,
  },
];

export function NotificationCenter() {
  return (
    <div className="w-[380px] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[600px]">
      <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
        <h3 className="font-bold text-lg flex items-center gap-2">
          알림 센터
        </h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Settings className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="flex-1 flex flex-col">
        <div className="px-4 pt-2 border-b border-border bg-muted/10">
          <TabsList className="w-full bg-transparent p-0 h-10 gap-6">
            <TabsTrigger 
              value="notifications" 
              className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 pb-2 pt-1 font-bold text-sm"
            >
              알림
              <Badge className="ml-2 bg-primary/10 text-primary border-0 text-[10px] h-4 px-1">2</Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="chats" 
              className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 pb-2 pt-1 font-bold text-sm"
            >
              대화
              <Badge className="ml-2 bg-primary/10 text-primary border-0 text-[10px] h-4 px-1">1</Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="notifications" className="flex-1 m-0 p-0 overflow-hidden">
          <ScrollArea className="h-[450px]">
            <div className="flex flex-col">
              <div className="px-4 py-2 bg-muted/30">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">이전 알림</p>
              </div>
              <div className="p-2 space-y-1">
                {NOTIFICATIONS.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={cn(
                      "p-3 rounded-xl transition-colors cursor-pointer group relative",
                      notif.isRead ? "hover:bg-muted/50" : "bg-primary/5 hover:bg-primary/10"
                    )}
                  >
                    <div className="flex gap-3">
                      <div className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                        notif.type === 'talent' ? "bg-purple-100" : 
                        notif.type === 'learning' ? "bg-emerald-100" : "bg-blue-100"
                      )}>
                        {notif.icon || <Bell className="h-5 w-5 text-blue-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="text-xs font-bold text-foreground">{notif.title}</p>
                          <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {notif.content}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                    {!notif.isRead && (
                      <div className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
          <div className="p-3 border-t border-border text-center">
            <Button variant="ghost" className="text-xs text-muted-foreground w-full h-8 rounded-lg">
              모든 알림 보기
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="chats" className="flex-1 m-0 p-0 overflow-hidden">
          <ScrollArea className="h-[450px]">
            <div className="p-2 space-y-1">
              {CHATS.map((chat) => (
                <div 
                  key={chat.id} 
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {chat.sender.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-foreground">{chat.sender.name}</p>
                      <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate pr-4">
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unreadCount > 0 && (
                    <Badge className="h-5 w-5 rounded-full flex items-center justify-center p-0 shrink-0">
                      {chat.unreadCount}
                    </Badge>
                  )}
                </div>
              ))}
              <div className="p-4">
                <Button className="w-full rounded-xl gap-2 font-bold" size="sm">
                  <MessageSquare className="h-4 w-4" />
                  자녀에게 메시지 보내기
                </Button>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
