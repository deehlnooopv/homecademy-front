"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/src/shared/ui/tabs";
import { Badge } from "@/src/shared/ui/badge";
import { Button } from "@/src/shared/ui/button";
import { Avatar, AvatarFallback } from "@/src/shared/ui/avatar";
import { Input } from "@/src/shared/ui/input";
import { ScrollArea } from "@/src/shared/ui/scroll-area";
import {
  Settings,
  BookOpen,
  Sparkles,
  Trophy,
  Send,
  MessageSquare,
  CheckCircle2,
  Star,
} from "lucide-react";

/** 알림 타입 정의 */
type NotificationType = "all" | "learning" | "talent" | "achievement";

/** 알림 아이템 데이터 */
interface NotificationItem {
  id: string;
  type: "learning" | "talent" | "achievement";
  title: string;
  message: string;
  childName: string;
  childColor: string;
  time: string;
  isRead: boolean;
}

/** 대화 아이템 데이터 */
interface ChatItem {
  id: string;
  childName: string;
  childColor: string;
  lastMessage: string;
  time: string;
  unread: number;
}

/** 샘플 알림 데이터 */
const SAMPLE_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    type: "learning",
    title: "학습 완료",
    message: "오늘 수학 학습을 모두 완료했어요! 10문제 중 9문제를 맞췄습니다.",
    childName: "지우",
    childColor: "from-orange-400 to-rose-400",
    time: "방금 전",
    isRead: false,
  },
  {
    id: "2",
    type: "talent",
    title: "재능 발견",
    message: "논리적 사고력이 또래 대비 상위 10%입니다! 코딩 수업을 추천드려요.",
    childName: "지우",
    childColor: "from-orange-400 to-rose-400",
    time: "1시간 전",
    isRead: false,
  },
  {
    id: "3",
    type: "achievement",
    title: "배지 획득",
    message: "7일 연속 학습 달성! '꾸준함의 달인' 배지를 획득했어요.",
    childName: "민준",
    childColor: "from-violet-400 to-purple-500",
    time: "3시간 전",
    isRead: true,
  },
  {
    id: "4",
    type: "learning",
    title: "학습 완료",
    message: "영어 단어 학습 완료! 오늘 20개 새 단어를 익혔어요.",
    childName: "민준",
    childColor: "from-violet-400 to-purple-500",
    time: "어제",
    isRead: true,
  },
  {
    id: "5",
    type: "talent",
    title: "재능 발견",
    message: "창의력 분야에서 특별한 재능이 발견되었어요! 미술 수업을 추천합니다.",
    childName: "민준",
    childColor: "from-violet-400 to-purple-500",
    time: "2일 전",
    isRead: true,
  },
];

/** 샘플 대화 데이터 */
const SAMPLE_CHATS: ChatItem[] = [
  {
    id: "1",
    childName: "지우",
    childColor: "from-orange-400 to-rose-400",
    lastMessage: "엄마, 오늘 수학 끝냈어요!",
    time: "방금 전",
    unread: 2,
  },
  {
    id: "2",
    childName: "민준",
    childColor: "from-violet-400 to-purple-500",
    lastMessage: "알겠어요~",
    time: "1시간 전",
    unread: 0,
  },
];

/** 알림 타입별 아이콘 */
const getNotificationIcon = (type: NotificationItem["type"]) => {
  switch (type) {
    case "learning":
      return <BookOpen className="w-4 h-4 text-blue-500" />;
    case "talent":
      return <Sparkles className="w-4 h-4 text-amber-500" />;
    case "achievement":
      return <Trophy className="w-4 h-4 text-emerald-500" />;
  }
};

/** 알림 타입별 배경색 */
const getNotificationBg = (type: NotificationItem["type"]) => {
  switch (type) {
    case "learning":
      return "bg-blue-50";
    case "talent":
      return "bg-amber-50";
    case "achievement":
      return "bg-emerald-50";
  }
};

/**
 * 알림 패널 컴포넌트
 * 네이버 스타일의 알림센터 UI
 * - 알림 탭: 학습 완료, 재능 발견, 배지 획득 등
 * - 대화 탭: 자녀와의 메시지 기능
 */
export function NotificationPanel() {
  const [activeTab, setActiveTab] = useState<"notifications" | "chat">("notifications");
  const [notificationFilter, setNotificationFilter] = useState<NotificationType>("all");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");

  /** 필터된 알림 목록 */
  const filteredNotifications = SAMPLE_NOTIFICATIONS.filter((notification) => {
    if (notificationFilter === "all") return true;
    return notification.type === notificationFilter;
  });

  /** 읽지 않은 알림 개수 */
  const unreadCount = SAMPLE_NOTIFICATIONS.filter((n) => !n.isRead).length;

  /** 선택된 채팅 정보 */
  const selectedChatInfo = SAMPLE_CHATS.find((c) => c.id === selectedChat);

  /** 메시지 전송 핸들러 */
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    // TODO: 실제 메시지 전송 로직 연동
    setMessageInput("");
  };

  return (
    <div className="w-[360px] bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-lg font-bold text-foreground">알림센터</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
          <Settings className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>

      {/* 탭 전환 */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "notifications" | "chat")}
        className="w-full"
      >
        <TabsList className="w-full h-12 bg-transparent rounded-none border-b border-border p-0">
          <TabsTrigger
            value="notifications"
            className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm font-semibold"
          >
            알림
            {unreadCount > 0 && (
              <Badge className="ml-1.5 h-5 min-w-5 px-1.5 bg-primary text-primary-foreground text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="chat"
            className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm font-semibold"
          >
            대화
            {SAMPLE_CHATS.reduce((acc, c) => acc + c.unread, 0) > 0 && (
              <Badge className="ml-1.5 h-5 min-w-5 px-1.5 bg-primary text-primary-foreground text-xs">
                {SAMPLE_CHATS.reduce((acc, c) => acc + c.unread, 0)}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* 알림 탭 콘텐츠 */}
        <TabsContent value="notifications" className="mt-0">
          {/* 필터 칩 */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-xs text-muted-foreground mb-2">알림 필터</p>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: "all", label: "전체" },
                { value: "learning", label: "학습 완료" },
                { value: "talent", label: "재능 발견" },
                { value: "achievement", label: "달성" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setNotificationFilter(filter.value as NotificationType)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    notificationFilter === filter.value
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* 알림 목록 */}
          <ScrollArea className="h-[360px]">
            <div className="divide-y divide-border">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">새로운 알림이 없어요</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3.5 hover:bg-muted/50 transition-colors cursor-pointer ${
                      !notification.isRead ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* 자녀 아바타 */}
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${notification.childColor} flex items-center justify-center shrink-0`}
                      >
                        <span className="text-white font-bold text-sm">
                          {notification.childName[0]}
                        </span>
                      </div>

                      {/* 알림 내용 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-sm text-foreground">
                              {notification.childName}
                            </span>
                            <div
                              className={`p-1 rounded-md ${getNotificationBg(notification.type)}`}
                            >
                              {getNotificationIcon(notification.type)}
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground shrink-0">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-foreground mt-1">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
                          {notification.message}
                        </p>
                      </div>

                      {/* 읽지 않음 표시 */}
                      {!notification.isRead && (
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* 대화 탭 콘텐츠 */}
        <TabsContent value="chat" className="mt-0">
          {selectedChat === null ? (
            /* 채팅 목록 */
            <ScrollArea className="h-[420px]">
              <div className="divide-y divide-border">
                {SAMPLE_CHATS.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className="w-full px-4 py-3.5 hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      {/* 자녀 아바타 */}
                      <div
                        className={`w-11 h-11 rounded-full bg-gradient-to-br ${chat.childColor} flex items-center justify-center shrink-0`}
                      >
                        <span className="text-white font-bold text-base">
                          {chat.childName[0]}
                        </span>
                      </div>

                      {/* 채팅 정보 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-foreground">
                            {chat.childName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {chat.time}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <p className="text-xs text-muted-foreground truncate pr-2">
                            {chat.lastMessage}
                          </p>
                          {chat.unread > 0 && (
                            <Badge className="h-5 min-w-5 px-1.5 bg-primary text-primary-foreground text-xs shrink-0">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}

                {/* 빈 상태 */}
                {SAMPLE_CHATS.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                      <MessageSquare className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">대화가 없어요</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          ) : (
            /* 채팅방 */
            <div className="flex flex-col h-[420px]">
              {/* 채팅방 헤더 */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                {selectedChatInfo && (
                  <>
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${selectedChatInfo.childColor} flex items-center justify-center`}
                    >
                      <span className="text-white font-bold text-sm">
                        {selectedChatInfo.childName[0]}
                      </span>
                    </div>
                    <span className="font-semibold text-sm text-foreground">
                      {selectedChatInfo.childName}
                    </span>
                  </>
                )}
              </div>

              {/* 채팅 메시지 영역 */}
              <ScrollArea className="flex-1 px-4 py-3">
                <div className="space-y-3">
                  {/* 샘플 메시지들 */}
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-3.5 py-2 max-w-[80%]">
                      <p className="text-sm">지우야, 오늘 수학 공부 열심히 하자!</p>
                      <p className="text-[10px] text-primary-foreground/70 text-right mt-1">
                        오전 10:30
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl rounded-tl-sm px-3.5 py-2 max-w-[80%]">
                      <p className="text-sm text-foreground">네, 엄마! 지금 시작할게요</p>
                      <p className="text-[10px] text-muted-foreground text-right mt-1">
                        오전 10:32
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl rounded-tl-sm px-3.5 py-2 max-w-[80%]">
                      <p className="text-sm text-foreground">엄마, 오늘 수학 끝냈어요!</p>
                      <p className="text-[10px] text-muted-foreground text-right mt-1">
                        오후 2:15
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-3.5 py-2 max-w-[80%]">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                        <span className="text-xs font-medium">칭찬 메시지</span>
                      </div>
                      <p className="text-sm">정말 잘했어! 오늘 열심히 했구나</p>
                      <p className="text-[10px] text-primary-foreground/70 text-right mt-1">
                        오후 2:18
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              {/* 메시지 입력 */}
              <div className="p-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="메시지를 입력하세요..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 h-10 rounded-xl bg-muted border-0 focus-visible:ring-1"
                  />
                  <Button
                    size="icon"
                    className="h-10 w-10 rounded-xl bg-primary hover:bg-primary/90"
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
